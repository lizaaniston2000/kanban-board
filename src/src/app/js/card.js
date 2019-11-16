const addButton = document.querySelectorAll('.add-task');
const inputTask = document.querySelectorAll('.input-task');
const closeButton = document.querySelectorAll('.close');



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


export class Task {
    constructor(description,column_id) {
        this.description = description;
        this.id = Number(new Date()).toString(36);
        this.column_id = column_id;
    }
    static createElem(task) {
        const newTask = document.createElement('div');
        newTask.innerHTML=`<p>${task.description}</p>`;
        newTask.className = 'task';
        newTask.id = task.id
        return newTask;
    }
}



