const addButton = document.querySelectorAll('.add-task');
const inputTask = document.querySelectorAll('.input-task');
const closeButton = document.querySelectorAll('.card .close');
const addColumn = document.getElementById('addColumn')
const errorMessage = document.querySelector('.error_alert');
const errorButton = document.querySelector('.error_alert .task-button');
const card = document.querySelectorAll('.card')

inputTask.forEach(task => {task.style.display = "none" })
errorMessage.style.display = 'none';


addButton.forEach((el,i) => {
    el.addEventListener('click', () => {
       el.style.display = 'none'
       inputTask[i].style.display='block'
    })
})

inputTask.forEach((el,i)=> {
    closeButton[i].addEventListener('click', ()=> {
        el.style.display = 'none';
        addButton[i].style.display = 'block'
    })
})

errorButton.addEventListener('click', () => {
    errorMessage.style.display = 'none';
})

class Task {
    constructor(task_name) {
        this.task_name = task_name;
    }
}
class UI {
    static displayTasks() {
        const tasks = Store.getTask();
        tasks.forEach((task) => UI.addTaskToList(task));
    }
    static addTaskToList(task) {
        const taskList = document.querySelector('.task-container');
        const newTask = document.createElement('div');
        newTask.setAttribute('class', 'task');
        newTask.innerHTML = `
            <p>${task.task_name}</p>
            `
        taskList.appendChild(newTask);
    }
    static clearFields() {
        document.querySelector('.input').value = ''
    }
}
class Store {
    static getTask() {
        let tasks;
        if (localStorage.getItem('tasks') === null) {
            tasks = [];
        } else {
            tasks = JSON.parse(localStorage.getItem('tasks'));
        }
        return tasks;
    }
    static addTask(task) {
        const tasks = Store.getTask();
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}
document.addEventListener('DOMContentLoaded', UI.displayTasks);

inputTask.forEach(el => {
    el.addEventListener('submit', (e) => {
        e.preventDefault();
        const task_name = document.querySelector('.input').value;
        if (task_name === '') {
            errorMessage.style.display = 'block';
        }
        else {
            const task = new Task(task_name);
            UI.addTaskToList(task);
            Store.addTask(task);
            UI.clearFields();
        }
    })
})


