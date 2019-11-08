import {clickBut, hideForm} from './card'

class Column {
    constructor(col_name) {
        this.col_name = col_name;
    }
    static newColumn(column) {
        this.createForm()
        this.createButton()
        const main = document.querySelector('.kanban_board');
        const col = document.createElement('div')
        const task_list = document.createElement ('ul')
        const form = document.querySelector('#new_task')
        const create_task = document.querySelector('#add-task')
        col.className = 'card'
        col.id = 'new_card'
        const title = document.createElement('h3')
        title.innerHTML =`<h3>${column.col_name}</h3> `
        main.appendChild(col)
        col.appendChild(title)
        col.appendChild(task_list)
        col.appendChild(form)
        col.appendChild(create_task)
    }
    static createForm() {
        const col = document.querySelector('.card')
        const form = document.createElement('form')
        const inp_cont = document.createElement('div')
        inp_cont.className = 'input_container'
        const input =  document.createElement('input')
        const button = document.createElement('button')
        button.className = 'task-button'
        input.placeholder = 'Введите название карточки'
        input.className = 'input'
        form.id = 'new_task'
        form.style.display = 'none'
        col.appendChild(form)
        form.appendChild(inp_cont)
        form.appendChild(button)
        inp_cont.appendChild(input)
    }
    static createButton () {
        const col = document.querySelector('.card')
        const create_task = document.createElement('div')
        const form = document.querySelector('#new_task')
        create_task.className = 'add-task'
        create_task.id = 'add-task'
        create_task.onclick = function() {
            form.style.display = 'block'
        }
        const span = document.createElement('span')
        span.innerHTML = 'Добавить ещё одну карточку'
        const img = document.createElement('img');
        img.src = 'src/public/img/Vector.png' 
        col.appendChild(create_task)
        create_task.appendChild(img)
        create_task.appendChild(span)
    }
}
class columnUI {
    static displayColumn() {
        const columns = Store.getColumn();
        columns.forEach((column) => {
            Column.newColumn(column)
        });
    }
    
}
class Store {
    static getColumn() {
        let columns;
        if (localStorage.getItem('columns') === null) {
            columns = [];
        } else {
            columns = JSON.parse(localStorage.getItem('columns'));
        }
        return columns;
    }
    static addColumn(column) {
        const columns = Store.getColumn();
        columns.push(column);
        localStorage.setItem('columns', JSON.stringify(columns));
    }
}

document.addEventListener('DOMContentLoaded', columnUI.displayColumn);


const new_column = document.getElementById('new_column')
new_column.addEventListener('submit', (e) => {
    e.preventDefault();
    const col_name = document.querySelector('#col_name').value;
    if (col_name === '') {
        errorMessage.style.display = 'block';
    }
    else {
        const column = new Column(col_name);
        Column.newColumn(column);
        Store.addColumn(column);
    }
})
