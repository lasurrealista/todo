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

const localStorageHandler = {

        setItem(key, value) {
        value = JSON.stringify(value);
        localStorage.setItem(key, value);
        },
        getItem(key) {
            const value = localStorage.getItem(key);
            return JSON.parse(value);
        },
        removeItem(key) {
            localStorage.removeItem(key);
        },

};

const init = () => {
    const savedTodos = localStorageHandler.getItem(inputContent.value);
    if (savedTodos) {
        todos = savedTodos;
    };
};

const inputContent = document.querySelector('.input__content');

const incompleteTasksList = document.querySelector('.incomplete__tasks');
const completedTasksList = document.querySelector('.completed__tasks');

const buttonShow = document.querySelector('.button__show');
const buttonClear = document.querySelector('.button__clear');
const chill = document.querySelector('.chill');

const createNewTask = (taskString) => {

    const listItem = document.createElement('li');
    const checkbox = document.createElement('input');
    const label = document.createElement('label');
    const buttonDelete = document.createElement('button');
    
    label.textContent = taskString;
    checkbox.type ='checkbox';

    buttonDelete.innerHTML = '<i class="fas fa-trash-alt"></i>';
    buttonDelete.className = 'delete';

    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(buttonDelete);
    return listItem;
    
};

const addNewTask = () => {

    let listItem = createNewTask(inputContent.value);
    localStorageHandler.setItem(listItem);
    incompleteTasksList.appendChild(listItem);
    handleTasks(listItem, taskCompleted);
    inputContent.value = '';

};

const deleteTask = (ev) => {

    let listItem = ev.currentTarget.parentNode;
    let ul = listItem.parentNode;
    ul.removeChild(listItem);
    localStorageHandler.removeItem(listItem);

};

const taskCompleted = () => {

    let listItem = this.parentNode;
    completedTasksList.appendChild(listItem);
    handleTasks(listItem, taskIncomplete);

};

const taskIncomplete = () => {

    let listItem = this.parentNode;
    incompleteTasksList.appendChild(listItem);
    handleTasks(listItem, taskCompleted);

};

const addButton = document.querySelector('.button__add');
addButton.addEventListener('click', () => {
    init;
    addNewTask;
});

const handleTasks = (anyListItem, checkboxHandler) => {

    const checkbox = anyListItem.querySelector("input[type=checkbox]");
    checkbox.onchange = checkboxHandler;

    const buttonDelete = document.querySelector('.delete');
    buttonDelete.addEventListener('click', deleteTask);

};

for (let i = 0; i < incompleteTasksList.children.length; i++) {
    handleTasks(incompleteTasksList.children[i], taskCompleted);
};

for (let i = 0; i < completedTasksList.children.length; i++) {
    handleTasks(completedTasksList.children[i], taskIncomplete);
};

const timeToChill = () => {
    chill.textContent = '🎉<br>Time to chill. You have no to-dos.';
    completedTasksList.classList.add('hide');
    buttonClear.classList.add('hide');
    buttonShow.classList.add('hide');
};
