const expertDOM = document.getElementById('expert');
const doctorDOM = document.getElementById('doctor');
const doctorTimeDOM = document.getElementById('doctor_time');

window.activeWeekDay = ["سه شنبه" , "پنجشنبه"];

const calendar = $("#doctor_day");
var dateObject = false;

loadDatePicker();


expertDOM.onchange = function() {
    const expert = this.value;
    resetDoctorsFields();
    doctors.forEach(function(doctor) {
        if (doctor['expert'] == expert) {
            doctorDOM.innerHTML += `<option value="${doctor['name']}">${doctor['name']}</option>`;
            updateDayAndTime(doctor);
            doctorDOM.onchange();
        }
    })
}

doctorDOM.onchange = function() {
    const doctor = this.value;
    resetDoctorsFields(this);
    doctors.forEach(function(doc) {
        if (doc['name'] == doctor) {
        	updateDayAndTime(doc);
        }
    });
}

function loadDatePicker(){
	
	dateObject = calendar.persianDatepicker({
	navigator:{
            enabled: false,
            scroll:{
            	enabled: false,
            }
    },
    timePicker: {enabled: false},
    format: 'YYYY/MM/DD',
    minDate: new persianDate().subtract('day', 0).valueOf(),
    checkDate: function(unix){
    	const date = new persianDate(unix).date();
    	const month = new persianDate(unix).month();
    	const day = new persianDate(unix).day();
    	const currentMonth = this.model.state.selected.month;
    	const currentDate = this.model.state.selected.date;
		
    	let show = false;
    	activeWeekDay.forEach(function(dayi){
    		if(month == currentMonth){
    			if(day == getWeekdayByNum(dayi)){
    				show = true;
    				return true;
    			}
    		}
    	});

        return show;
    },
    onSelect : function(selectedDayUnix){
    	dateObject.hide()
    }
});

	
}

function resetDoctorsFields(exception){
	const domList = [doctorDOM , doctorTimeDOM];
	
	domList.forEach(function(dom){
		if(exception != dom){
			dom.innerHTML = "";
		}
		
	});
}

function updateDayAndTime(doctor) {
    const days = doctor['weekdays'].split(",");
    const time = doctor['time'].split(",");

    days.forEach(function(day,key) {
        days[key] = day.toString().trim();
    });

    activeWeekDay = days;
    loadDatePicker();

    time.forEach(function(tme) {
        doctorTimeDOM.innerHTML += `<option value="${tme}">${tme}</option>`;
    });
}

function getWeekdayByNum(dayLetter){
	const days = {1: "شنبه" , 2: "یکشنبه" , 3: "دوشنبه" , 4: "سه شنبه" , 5: "چهارشنبه" , 6: "پنجشنبه" , 7: "جمعه"}

	const keys = Object.keys(days);
	for (var i = 0; i < keys.length; i++) {
		const key = keys[i];
		if(days[key] == dayLetter){
			return key;
		}
	}

	return false;
}