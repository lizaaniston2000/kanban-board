import { Task } from './card'
import { Store } from './store'
import { UI } from './UI'

const errorButton = document.querySelector('.error_alert .task-button');
const errorMessage = document.querySelector('.error_alert');
const confirm = document.getElementById('confirm_alert')

export class Column {
    constructor(col_name) {
        this.col_name = col_name;
        this.id = Number(new Date()).toString(36);
        this.task_list = [];
    }
    static newColumn(column) {
        const main = document.querySelector('.kanban_board');
        const col = document.createElement('div');
        col.className = 'card';
        col.id = column.id;
        const title = document.createElement('h3');
        title.innerHTML = `${column.col_name}`;
        const deleteButton = document.createElement('img');
        deleteButton.src = 'src/public/img/cross.png';
        deleteButton.id = 'delete-' + column.id
        title.appendChild(deleteButton)
        const task_list = this.createTaskList();
        const form = this.createForm(column);
        const addCard = this.createAddCardButton(column);
        const task_container = document.createElement('div');
        task_container.className = 'task-container';
        const buttonAddCard = main.querySelector('#add-col')
        main.insertBefore(col, buttonAddCard);
        col.appendChild(title);
        col.appendChild(task_list);
        task_list.appendChild(task_container);
        col.appendChild(form);
        col.appendChild(addCard);
        form.addEventListener('submit', (e) => {
            e.preventDefault()
            let task = document.getElementById("inp" + '-' + column.id).value;
            let card = new Task(task, column.id);
            if (task !== '') {
                Store.AddtaskList(card, column);
                let new_task = Task.createElem(card);
                task_container.appendChild(new_task);
                document.getElementById("inp" + '-' + column.id).value = ''
            }
            else {
                document.getElementById("inp" + '-' + column.id).value = ''
                errorMessage.style.display = 'block';
                errorButton.onclick = () => {
                    errorMessage.style.display = 'none';
                }
            }
        })
        this.showAddButton(column);
        this.showForm(column);
        this.deleteColumn(column)
        let cards = Store.taskList(column.id);
        cards.forEach(element => {
            let task = Task.createElem(element,column)
            task_container.appendChild(task);
        });
        return col;
    }
    static deleteColumn(column) {
        document.getElementById('delete-' + column.id).onclick = () => {
            confirm.style.display = 'block';
            confirm.onclick = (e) => {
                let target = e.target
                if (target.id == 'ok') {
                    Store.deleteColumn(column.id)
                    document.getElementById(column.id).remove();
                    document.getElementById('confirm_alert').style.display = 'none'; 
                }
                else {
                    document.getElementById('confirm_alert').style.display = 'none';
                } 
            }
        }
    }
    static showAddButton(column) {
        document.getElementById('close' + column.id).onclick = () => {
            document.getElementById('new_task' + column.id).style.display = 'none';
            document.getElementById('add-task' + column.id).style.display = 'block';
        }
    }
    static showForm(column) {
        document.getElementById('add-task' + column.id).onclick = () => {
            document.getElementById('new_task' + column.id).style.display = 'block';
            document.getElementById('add-task' + column.id).style.display = 'none';
        }
    }
    static createTaskList() {
        const task_list = document.createElement('div');
        task_list.className = 'task-list';
        return task_list;
    }
    static createForm(column) {
        const form = document.createElement('form');
        const inp_cont = document.createElement('div');
        inp_cont.className = 'input_container';
        const input = document.createElement('input');
        const button = document.createElement('button');
        const cansel = document.createElement('img');
        cansel.className = 'close';
        cansel.id = 'close' + column.id;
        cansel.src = 'src/public/img/cross.png';
        button.className = 'task-button';
        button.textContent = 'Добавить карточку';
        input.placeholder = 'Введите название карточки';
        input.className = 'input';
        input.setAttribute('id', 'inp' + '-' + column.id);
        form.id = 'new_task' + column.id;
        form.className = 'input-task';
        form.style.display = 'none';
        form.appendChild(inp_cont);
        form.appendChild(button);
        inp_cont.appendChild(input);
        form.appendChild(cansel);
        return form
    }
    static createAddCardButton(column) {
        const create_task = document.createElement('div');
        create_task.className = 'add-task';
        create_task.id = 'add-task' + column.id;
        const span = document.createElement('span');
        span.innerHTML = 'Добавить ещё одну карточку';
        const img = document.createElement('img');
        img.src = 'src/public/img/Vector.png';
        create_task.appendChild(img);
        create_task.appendChild(span);
        return create_task;
    }
}

document.addEventListener('DOMContentLoaded', UI.displayColumn);

const new_column = document.getElementById('new_column')
new_column.addEventListener('submit', (e) => {
    e.preventDefault();
    UI.createColumn();
})





