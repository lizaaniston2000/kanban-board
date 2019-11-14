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
        const task_list = this.createTask()
        const form = this.createForm(column)
        const addCard = this.createButton(column)
        main.appendChild(col)
        col.appendChild(title)
        col.appendChild(task_list)
        col.appendChild(form)
        col.appendChild(addCard)
        form.addEventListener('submit', (e) => {
            e.preventDefault()
            let task = document.getElementById("inp" + '-' + column.id).value
            console.log(task)
            let card = new Task(task)
            let new_task = Task.createElem(card)
            task_list.appendChild(new_task)
            column.task_list.push(card)
            let cards = column.task_list
            Task.addTask(cards)
            console.log(column.task_list)
        })
        this.showAddButton(column)
        this.showForm(column)
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
    static createTask() {
        const task_list = document.createElement('div');
        task_list.className = 'task-list'
        const taskCont = document.createElement('div');
        taskCont.className = 'task-container'
        task_list.appendChild(taskCont)
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
    static createButton(column) {
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
    static getColumn(column) {
        const columns = Store.getColumns();
        let col = columns.filter((elem)=>{
            elem == column
        })
        console.log(col)
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
            const column = new Column(col_name);
            Column.newColumn(column);
            this.addColumn(column);
            console.log(column)
            console.log(column.col_name)
        }
    }
}

document.addEventListener('DOMContentLoaded', UI.displayColumn);
const new_column = document.getElementById('new_column')
new_column.addEventListener('submit', (e) => {
    e.preventDefault();
    Store.createColumn()
})





