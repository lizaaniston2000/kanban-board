import { Column } from './column';
import { Card } from './card';
import { Store } from './store';
import { Sortable } from '@shopify/draggable';
import { isPrevented } from './helper'
export class UI {
    constructor(columns) {
        this.columns = columns
    }
    render() {
        document.querySelector('.column_list').innerHTML = this.template();
        this.addEventListeners();
        this.postTask();
        this.draggedFunc();
    }
    template() {
        return `${this.columns.map(elem => {
            let column = new Column(elem.state);
            return column.template();
        }).join('')}`
    }
    addEventListeners() {
        let buttons = document.getElementsByClassName('add-task');
        [...document.getElementsByClassName('add-task')].forEach((element) => {
            element.onclick = () => {
                let parent = element.parentNode;
                let id = parent.id;
                document.getElementById('new_task' + id).style.display = 'block';
                document.getElementById("add-task-" + id).style.display = 'none';
                document.getElementById('close' + id).onclick = () => {
                    document.getElementById('new_task' + id).style.display = 'none';
                    document.getElementById("add-task-" + id).style.display = 'block';
                }
            }
        })
    }
    postTask() {
        [...document.getElementsByClassName('input-task')].forEach((element) => {
            if (element.id !== 'new_column') {
                element.addEventListener('submit', (e) => {
                    e.preventDefault()
                    let target = element.parentNode;
                    let id = target.id;
                    let task = document.getElementById('task_name' + id).value;
                    let card = new Card({ description: task, column_id: id });
                    if (task !== '') {
                        let obj = card.renderTask();
                        Store.AddtaskList(card)
                        document.getElementById('tasks' + id).innerHTML += obj;
                        document.getElementById('task_name' + id).value = '';
                        this.deleteTask();
                    }
                    else {
                        document.querySelector('.error_alert').style.display = 'block'
                        document.querySelector('.error_alert').onclick = (e) => {
                            if (e.target.className == 'task-button') {
                                document.querySelector('.error_alert').style.display = 'none'
                            }
                        }
                    }
                })
            }
        })
    }
    deleteTask() {
        [...document.getElementsByClassName('cansel')].forEach((element) => {
            element.onclick = () => {
                let task_id = element.parentNode.id;
                let column_id = element.parentNode.parentNode.parentNode.parentNode.id;
                Store.deleteElementTaskList(column_id, task_id);
                document.getElementById(task_id).remove();
            }
        })
    }
    deleteColumn() {
        [...document.getElementsByClassName('delete')].forEach((element) => {
            element.onclick = () => {
                const confirm = document.getElementById('confirm_alert');
                confirm.style.display = 'block';
                confirm.onclick = (e) => {
                    let target = e.target;
                    if (target.id == 'ok') {
                        let parent = element.parentNode;
                        let column_id = parent.parentNode.id;
                        Store.deleteColumn(column_id);
                        document.getElementById(column_id).remove();
                        confirm.style.display = 'none';
                    }
                    else {
                        document.getElementById('confirm_alert').style.display = 'none';
                    }
                }
            }
        })
    }
    draggedFunc() {
        const sortable = new Sortable(
            document.querySelectorAll(".task-container"), {
            draggable: '.task',
            dropzone: ".task-container",
            delay: 0,
        }
        )
        sortable.on('sortable:start', (e) => {
            if (e.dragEvent.data.sensorEvent.target.className == 'cansel') {
                e.cancel();
            }
        })
        sortable.on('sortable:stop', (e) => {
            let id = e.newContainer.parentNode.parentNode.id;
            let oldColumnId = e.dragEvent.data.sourceContainer.parentNode.parentNode.id;
            let task_id = e.dragEvent.data.source.id;
            let i = e.data.newIndex;
            let old = e.data.oldIndex;
            Store.pushTaskToColumn(id, oldColumnId, task_id, i, old);
        })
    }
    draggedColumn() {
        const sortable = new Sortable(
            document.querySelector('.column_list'), {
            draggable: '.card',
            dropzone: ".column_list",
            delay: 0
        })

        sortable.on('sortable:start', (e) => {
            const currentTarget = e.dragEvent.data.sensorEvent.target;
            if (isPrevented(currentTarget, ['add-task', 'delete', 'input-task', 'close', 'cansel', 'task'])) {
                e.cancel();
            }
        })
        sortable.on('sortable:stop', (e) => {
            let i = e.data.newIndex;
            let old = e.data.oldIndex;
            let elem_id = e.dragEvent.data.source.id;
            Store.sortColumn(elem_id, i, old);
        })
    }
}

