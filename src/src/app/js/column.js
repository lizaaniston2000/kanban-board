import {Task} from './card'
class Column {
    constructor(col_name) {
        this.col_name = col_name;
        this.id = Number(new Date()).toString(36);
        this.task_list = []
    } 
    static newColumn(column) {
        this.createTask()
        this.createForm()
        this.createButton()
        const main = document.querySelector('.kanban_board');
        const col = document.createElement('div')
        const form = document.querySelector('#new_task')
        const create_task = document.querySelector('#add-task')
        const taskList = document.querySelector('.task-list')
        col.className = 'card'
        col.setAttribute('id', column.id)
        const title = document.createElement('h3')
        title.innerHTML =`<h3>${column.col_name}</h3> `
        main.appendChild(col)
        col.appendChild(title)
        col.appendChild(form)
        col.appendChild(create_task)
        col.appendChild(taskList)
    }
    static createTask() {
        const col = document.querySelector('.card');
        const task_list = document.createElement ('div');
        task_list.className = 'task-list'
        const taskCont = document.createElement ('div');
        taskCont.className = 'task-container'
        col.appendChild(task_list)
        task_list.appendChild(taskCont)
    }
    static createForm() {
        const col = document.querySelector('.card form')
        const form = document.createElement('form')
        const inp_cont = document.createElement('div')
        inp_cont.className = 'input_container'
        const input =  document.createElement('input')
        const button = document.createElement('button')
        const cansel = document.createElement('img')
        cansel.onclick = () => {
            form.style.display = 'none'
            this.showButton()  
        }
        cansel.className = 'close'
        cansel.src = 'src/public/img/cross.png'
        button.className = 'task-button'
        button.textContent = 'Добавить карточку'
        button.id = 'button-task'
        input.placeholder = 'Введите название карточки'
        input.className = 'input'
        input.id = "task_name"
        form.id = 'new_task'
        form.style.display = 'none'
        col.appendChild(form)
        form.appendChild(inp_cont)
        form.appendChild(button)
        inp_cont.appendChild(input)
        form.appendChild(cansel)
        /* form.onsubmit = (e) => {
            e.preventDefault()
            this.addDescription()
        }  */
    }
    static createButton () {
        const col = document.querySelector('.card')
        const create_task = document.createElement('div')
        const form = document.querySelector('#new_task')
        create_task.className = 'add-task'
        create_task.id = 'add-task'
        create_task.onclick = function() {
            form.style.display = 'block'
            create_task.style.display = 'none'
        }
        const span = document.createElement('span')
        span.innerHTML = 'Добавить ещё одну карточку'
        const img = document.createElement('img');
        img.src = 'src/public/img/Vector.png' 
        col.appendChild(create_task)
        create_task.appendChild(img)
        create_task.appendChild(span)
    }
    static showButton() {
        const buttons = document.querySelectorAll('#add-task')
        buttons.forEach((el,i)=>{
          el.style.display='block'
        })
    }
    static addDescription() {
        const task_name = document.querySelector('#task_name').value;
        console.log(task_name)
        return task_name
    }
}
/* const card = document.querySelector('.card')
card.onclick = (e) => {
    const target = e.target
    if(e.target.id = 'button-task')
    Column.addDescription()
} */

class UI {
    static displayColumn() {
        const columns = Store.getColumns();
        columns.forEach((column) => {
            Column.newColumn(column)
        })
        columns.forEach((column) => {
            let elems = document.getElementById(column.id)
        })
    }
   /*  static getDisplayColumn () {
        const columns = Store.getColumns();
        columns.forEach((column,i) => {
            if(this.displayColumn) {
                let elem = document.getElementById(column.id)
                console.log(elem)
            }
        })
    } */
    static getColumn(column) {
        let columns = this.getDisplayColumn()
        let element = columns.filter(el => el == column.id)
        console.log(element)
        return element
    } 
}
class Store {
    static getColumns() {
        let columns;
        if (localStorage.getItem('columns') === null) {
            columns = []
        } else {
            columns = JSON.parse(localStorage.getItem('columns'));
        }
        return columns;
    }
    static addColumn(column) {
        const columns = Store.getColumns();
        columns.push(column);
        localStorage.setItem('columns', JSON.stringify(columns));
    } 
    static createColumn() {
        const col_name = document.querySelector('#col_name').value;
        if (col_name === '') {
            errorMessage.style.display = 'block';
        }
        else {
            const taskList = []
            const column = new Column(col_name,taskList);
            Column.newColumn(column);
            this.addColumn(column);
            console.log(column)
            console.log(column.col_name)
        }
    }
    /* static returnButton() {
        const button_group = document.querySelectorAll('#button-task')
        console.log(button_group.length)
        return button_group
    } */
    /* static addTask() {
        let column = getColumn()
        const task_name = document.querySelector('#task_name').value;
        const task = new Task(task_name)
        tasks.push(task) 
        columns.forEach((column,i) => {
            column[i]
        })
        columns.push(task)
        Task.getElement(task)
    }
    static showTask() {

    } */
}


document.addEventListener('DOMContentLoaded', UI.displayColumn);
document.addEventListener('DOMContentLoaded', UI.getId);
const new_column = document.getElementById('new_column')

new_column.addEventListener('submit', (e) => {
    e.preventDefault();
    Store.createColumn()
   /*  Store.returnButton() */
})
/* let button_group = document.querySelectorAll('#button-task') */
/* a.forEach((el) => {
    el.onclick = (e) => {
        e.preventDefault()
        console.log('Hello9')
    }
}) */

/* const form_task = UI.getDisplayColumn() */




/* const button = document.querySelectorAll('#button-task')
button.forEach((el,i)=>el.onclick = (e) => {
    e.preventDefault()
    console.log(el[i])
})
 */