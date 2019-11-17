const addButton = document.querySelectorAll('.add-task');
const inputTask = document.querySelectorAll('.input-task');
const closeButton = document.querySelectorAll('.close');
import {Store} from './store'


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
    static createElem(task,cards) {
        const newTask = document.createElement('div');
        newTask.innerHTML=`<p>${task.description}</p>`;
        newTask.className = 'task';
        newTask.id = task.id
        let deleteTask = document.createElement('img')
        deleteTask.src = 'src/public/img/cross.png';
        deleteTask.id = 'del-task'+ task.id
        newTask.appendChild(deleteTask)
        deleteTask.addEventListener('click',()=>{
            function getTaskIndex () {
                for(let i = 0; i<cards.length; i++) {
                    console.log(cards[i])
                    return i
                }
            }
            let i = getTaskIndex ()
            if (i !== -1) {
                cards.splice(i, 1)
                document.getElementById(task.id).remove()
                Store.deleteElementTaskList(cards)
                console.log(cards)
            }
        })
        return newTask;
    }
}



