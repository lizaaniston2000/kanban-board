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
    constructor(description,column_id) {
        this.description = description
        this.id = Number(new Date()).toString(36);
        this.column_id = column_id
    }
    static createElem(task) {
        const newTask = document.createElement('div')
        newTask.innerHTML=`<p>${task.description}</p>`
        newTask.className = 'task'
        return newTask
    }
}



