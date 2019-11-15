import { Task } from './card'
class Column {
    constructor(col_name) {
        this.col_name = col_name;
        this.id = Number(new Date()).toString(36);
        this.task_list = []
    }
    static newColumn(column) {
        const main = document.querySelector('.kanban_board');
        const col = document.createElement('div')
        col.className = 'card'
        col.id = column.id
        const title = document.createElement('h3')
        title.innerHTML = `<h3>${column.col_name}</h3> `
        const task_list = this.createTaskList()
        const form = this.createForm(column)
        const addCard = this.createAddCardButton(column)
        const task_container = document.createElement('div') 
        task_container.className = 'task-container' 
        main.appendChild(col)
        col.appendChild(title)
        col.appendChild(task_list)
        task_list.appendChild(task_container)
        col.appendChild(form)
        col.appendChild(addCard)
        form.addEventListener('submit', (e) => {
            e.preventDefault()
            let task = document.getElementById("inp" + '-' + column.id).value
            let card = new Task(task,column.id)
            Store.AddtaskList(card,column)
            let new_task = Task.createElem(card)
            task_container.appendChild(new_task)
        })
        this.showAddButton(column)
        this.showForm(column)
        const cards = Store.taskList(column.id)
        console.log(cards) 
        let description = cards.map(elems => elems.description)
        description.forEach((elem) => {
            let task = document.createElement('div');
            task.className = 'task'
            task.innerHTML = `<p>${elem}</p>`
            task_container.appendChild(task)
        })  
        return col
    }
    static showAddButton(column) {
        document.getElementById('close' + column.id).onclick = () => {
            document.getElementById('new_task' + column.id).style.display = 'none'
            document.getElementById('add-task' + column.id).style.display = 'block'
        }
    }
    static showForm(column) {
        document.getElementById('add-task' + column.id).onclick = () => {
            document.getElementById('new_task' + column.id).style.display = 'block'
            document.getElementById('add-task' + column.id).style.display = 'none'
        }
    }
    static createTaskList() {
        const task_list = document.createElement('div');
        task_list.className = 'task-list'
        return task_list
    }
    static createForm(column) {
        const form = document.createElement('form')
        const inp_cont = document.createElement('div')
        inp_cont.className = 'input_container'
        const input = document.createElement('input')
        const button = document.createElement('button')
        const cansel = document.createElement('img')
        cansel.className = 'close'
        cansel.id = 'close' + column.id
        cansel.src = 'src/public/img/cross.png'
        button.className = 'task-button'
        button.textContent = 'Добавить карточку'
        input.placeholder = 'Введите название карточки'
        input.className = 'input'
        input.setAttribute('id', 'inp' + '-' + column.id)
        form.id = 'new_task' + column.id
        form.className = 'input-task'
        form.style.display = 'none'
        form.appendChild(inp_cont)
        form.appendChild(button)
        inp_cont.appendChild(input)
        form.appendChild(cansel)
        return form
    }
    static createAddCardButton(column) {
        const create_task = document.createElement('div')
        create_task.className = 'add-task'
        create_task.id = 'add-task' + column.id
        const span = document.createElement('span')
        span.innerHTML = 'Добавить ещё одну карточку'
        const img = document.createElement('img');
        img.src = 'src/public/img/Vector.png'
        create_task.appendChild(img)
        create_task.appendChild(span)
        return create_task
    }
}

class UI {
    static displayColumn() {
        const columns = Store.getColumns();
        columns.forEach((column) => {
            Column.newColumn(column);
        })
    }
}
export class Store {
    static getColumns() {
        let columns;
        if (localStorage.getItem('columns') === null) {
            columns = []
        } else {
            columns = JSON.parse(localStorage.getItem('columns'));
        }
        return columns;
    }
    static AddtaskList (task) {
        let columns = this.getColumns();
        for(let i=0; i<columns.length; i++) { 
            if (columns[i].id == task.column_id) {
                columns[i].task_list.push(task)
            }
            /* let index = columns.indexOf(columns[i]);
            console.log(index) */
        }
        localStorage.setItem('columns', JSON.stringify(columns));
        /* } */ 
    }
    static taskList(column_id) {
        let columns = JSON.parse(localStorage.getItem('columns'))
        for(let i=0; i<columns.length; i++) {
            if (columns[i].id == column_id) {
                return columns[i].task_list
            }
        }
        return []
    } 
    /* static addTask(task) {
        let taskList = this.taskList()
        taskList.push(task)
        console.log(taskList)
    } */
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
            const column = new Column(col_name);
            this.addColumn(column);
            Column.newColumn(column);
        }
    }
}

document.addEventListener('DOMContentLoaded', UI.displayColumn);


const new_column = document.getElementById('new_column')
new_column.addEventListener('submit', (e) => {
    e.preventDefault();
    Store.createColumn()
})





