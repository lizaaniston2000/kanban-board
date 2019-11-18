import { Store } from './store'

export class Task {
    constructor(description, column_id) {
        this.description = description;
        this.id = Number(new Date()).toString(36);
        this.column_id = column_id;
    }
    static createElem(task) {
        const newTask = document.createElement('div');
        newTask.innerHTML = `<p>${task.description}</p>`;
        newTask.className = 'task';
        newTask.id = task.id
        let deleteTask = document.createElement('img')
        deleteTask.src = 'src/public/img/cross.png';
        deleteTask.id = 'del-task' + task.id
        newTask.appendChild(deleteTask)
        deleteTask.addEventListener('click', () => {
            let cards = Store.taskList(task.column_id)
            Store.deleteElementTaskList(cards,task)
            document.getElementById(task.id).remove()
        })
        return newTask;
    }
}



