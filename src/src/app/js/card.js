const addButton = document.querySelectorAll('.add-task');
const inputTask = document.querySelectorAll('.input-task');
const closeButton = document.querySelectorAll('.close');
const errorMessage = document.querySelector('.error_alert');
const errorButton = document.querySelector('.error_alert .task-button');

clickBut()
function clickBut() {
    addButton.forEach((el,i) => {
        el.onclick = () => {
        el.style.display = 'none'
        inputTask[i].style.display='block'
        }
    })
}

inputTask.forEach((el,i)=> {
    closeButton[i].addEventListener('click', ()=> {
        el.style.display = 'none';
        addButton[i].style.display = 'block'
    })
})

errorButton.addEventListener('click', () => {
    errorMessage.style.display = 'none';
})

/* export function hideForm() {
  inputTask.forEach(task =>  {task.style.display = "none" })
} */


errorMessage.style.display = 'none'; 
export class Task {
    constructor(description) {
        this.description = description
        this.id = Number(new Date()).toString(36);
    }
    static createElem(task) {
        const task_cont = document.querySelector('.task-container')
        const newTask = document.createElement('div')
        newTask.innerHTML=`<p>${task.description}</p>`
        newTask.className = 'task'
        task_cont.appendChild(newTask)
        return newTask
    }
    static getCards() {
        let cards;
        if (localStorage.getItem('card') === null) {
            cards = []
        } else {
            cards = JSON.parse(localStorage.getItem('cards'));
        }
        return cards;
    }
    static addTask(task) {
        const cards = this.getCards();
        cards.push(task);
        localStorage.setItem('cards', JSON.stringify(cards));
    } 
    static displayCard() {
        const cards = this.getCards();
        cards.forEach((card) => {
            this.createElem(card)
        })
    }
}


/* document.addEventListener('DOMContentLoaded', UI.displayTasks);

const new_task = document.getElementById('new_task');

new_task.addEventListener('submit', (e) => {
    e.preventDefault();
    const task_name = document.querySelector('#task_name').value;
    if (task_name === '') {
        errorMessage.style.display = 'block';
    }
    else {
        const task = new Task(task_name, );
        UI.addTaskToList(task);
        Store.addTask(task);
        UI.clearFields();
    }
})  */