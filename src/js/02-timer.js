import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';
import "notiflix/dist/notiflix-3.2.6.min.css";

const inputData = document.getElementById(['datetime-picker']);
const startBtn = document.querySelector('[data-start]');
const timer = document.querySelector('.timer');
const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');
let timerId = null;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose: function (selectedDates) {
        if (selectedDates[0] - new Date() <= 0) {
            Notiflix.Notify.failure('Please choose a date in the future')
            console.log(selectedDates[0]);
            return 
        }
        else {
            Notiflix.Notify.success('You can start the countdown')
            startBtn.removeAttribute('disabled')
            console.dir(selectedDates[0]);
            return 
        }
    }
}
inputData.flatpickr(options);

startBtn.addEventListener('click', onStartBtnClick);
startBtn.setAttribute('disabled', 'disabled');

function onStartBtnClick() {
    timerId = setInterval(calkTimer, 1000);
    startBtn.setAttribute('disabled', 'disabled');
    inputData.setAttribute('disabled', 'disabled');
};

function calkTimer() {
    let ms = new Date(inputData.value) - new Date();
    let d = addLeadingZero(Math.floor(ms / 86400000));
    let h = addLeadingZero(Math.floor(ms / 3600000 % 24));
    let m = addLeadingZero(Math.floor(ms / 60000 % 60));
    let s = addLeadingZero(Math.floor(ms / 1000 % 60));
    if (ms < 0) {
        days.textContent = '00';
        hours.textContent = '00';
        minutes.textContent = '00';
        seconds.textContent = '00';
        timer.insertAdjacentHTML("afterend", "<p>The timer has run out</p>");
        clearInterval(timerId);
    }
    else {
        days.textContent = d;
        hours.textContent = h;
        minutes.textContent = m;
        seconds.textContent = s;
    };
};

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
};