'use strict';

const displayDay = document.querySelector('.day');
const displayDate = document.querySelector('.date');

let today = new Date();

let day = today.toLocaleString('en-us', {weekday:'long'});
let date = today.getDate() + '-' + (today.getMonth() + 1 ) + '-' + today.getFullYear();

const showDay = () => {
    displayDay.textContent = day;
};

const showDate = () => {
    displayDate.textContent = date;
};

showDay();
showDate();

const todoInput = document.querySelector('.todo__input');
const addTodoButton = document.querySelector('.addTodo__button');
const todoContainer = document.querySelector('.todo__container');
const completedContainer = document.querySelector('.completed__container');
const todoCounterDisplayer = document.querySelector('.counter');
const completedPercent = document.querySelector('.completed__percent');
const showHideButton = document.querySelector('.showHide__button');
const clearAllButton = document.querySelector('.clearAll__button');
const chill = document.querySelector('.chill');
const lowerButtons = document.querySelector('.button__container');
const listContainer = document.querySelector('.list');

let todoCounter = 0;
let todoID = 1;

const timeToChill = () => {
    chill.classList.remove('hide');
    chill.innerHTML = `🎉<br><p></p>Time to chill. 
        You have no to-dos.`;
};

const resetCounter = () => {
    todoCounter = 0; 
    todoCounterDisplayer.textContent = todoCounter;
    timeToChill();
};

const updateCounter = (direction) => {

    if (direction) todoCounter += 1;
    else todoCounter -= 1; 
    todoCounterDisplayer.textContent = todoCounter;

    if (todoCounter <= 0) {
        timeToChill();
        lowerButtons.classList.remove('show');
        listContainer.classList.remove('show');
    } return;

};

const deleteTodo = (id) => {
    document.querySelector(`[data-id="${id}"]`)
        .parentElement.remove();
    localStorage.removeItem(id);
    updateCounter(false);
};

const percentCounter = () => {
    let a = todoContainer.childElementCount;
    let b = completedContainer.childElementCount;
    completedPercent.textContent = Math.round(((a + b) - a) * 100 / (a + b)) +'%';
};

const todoCompleted = (id) => {

    let valueString = localStorage.getItem(id);

    valueString = valueString.replace('"state":1', '"state":2');
    localStorage.setItem(id, valueString);

    const targetCheckbox = document.querySelector(`[data-setid="${id}"]`);
    const targetTodo = targetCheckbox.parentElement;

    targetCheckbox.disabled = true;
    targetTodo.remove();
    completedContainer.insertBefore(targetTodo, completedContainer.firstChild);
    updateCounter(false);
    percentCounter();

};

const addDeleteEventListener = (id) => 
    document.querySelector(`[data-id="${id}"]`)
    .addEventListener('click', () => deleteTodo(id));

const addSetEventListener = (id) => 
    document.querySelector(`[data-setid="${id}"]`)
    .addEventListener('click', () => todoCompleted(id));

const createTodo = (text, id, state, datetime) => {

    lowerButtons.classList.add('show');
    listContainer.classList.add('show');

    let isChecked = '';
    let parentContainer = todoContainer;

    const todoItem = document.createElement('div');

    todoItem.classList.add('todo-item');
    todoItem.setAttribute('title', datetime);

    if (parseInt(state) === 2) {
        parentContainer = completedContainer;
        isChecked = 'checked disabled';
    } else {
        updateCounter(true);
    }

    todoItem.innerHTML = `<input type="checkbox" ${isChecked} 
        name="set-completed" class="set-completed" data-setid="${id}"> ${text} 
        <button class="delete__button" data-id="${id}">
        <i class="fas fa-trash-alt"></i></button>`;
    parentContainer.insertBefore(todoItem, parentContainer.firstChild);

    percentCounter();
};

const addTodo = () => {

    chill.classList.add('hide');

    if (todoInput.value) {
        const currentDate = new Date();
        createTodo(todoInput.value, todoID, 1, currentDate);

        localStorage.setItem(todoID.toString(), JSON.stringify(
            {
                todo: todoInput.value,
                state: 1,  
                createDate: currentDate, 
            }
            ));

        addDeleteEventListener(todoID);
        addSetEventListener(todoID);
        todoInput.value = '';
        todoID += 1;
    } 
}

Object.keys(localStorage).forEach((key) => {

    const obj = JSON.parse(localStorage.getItem(key));

    createTodo(obj.todo, key, obj.state);
    addDeleteEventListener(key);
    addSetEventListener(key);

    if(parseInt(key) >= todoID) todoID = parseInt(key) + 1;
});

const manageShowHide = () => {

    const buttonText = showHideButton.textContent;

    if (buttonText == 'Show Complete') {
        completedContainer.classList.remove('hide');
        showHideButton.textContent = 'Hide Complete';
    } else {
        completedContainer.classList.add('hide');
        showHideButton.textContent = 'Show Complete';
    };
};

const clearAll = () => {

    Object.keys(localStorage).forEach((key) => {
        const obj = JSON.parse(localStorage.getItem(key));

        if (parseInt(obj.state) === 1) {
            localStorage.removeItem(key);
            document.querySelector(`[data-setid="${key}"]`).parentElement.remove();
            resetCounter();
        };
    });
};

(function addTodoClickListener () {
    addTodoButton.addEventListener('click', addTodo)})();

(function addShowHideClickListener () {
    showHideButton.addEventListener('click', manageShowHide)})();

(function clearAllClickListener () {
    clearAllButton.addEventListener('click', clearAll)})();



