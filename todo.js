'use script';

const displayDay = document.querySelector('.day');
const displayDate = document.querySelector('.date');

let today = new Date();

let day = today.toLocaleString('en-us', {weekday:'long'})
let date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();

const showDay = () => {
    displayDay.textContent = day;
}

const showDate = () => {
    displayDate.textContent = date;
}

showDay();
showDate();
