import "../style/app.scss"
import "./js/card"
import "./js/column"
import { UI } from './js/ui'
import { Store } from './js/store'

const addButton = document.querySelector('.add-column');
const inputTask = document.querySelector('.input-task');
const closeButton = document.querySelector('.close');

addButton.onclick = () => {
    addButton.style.display = 'none';
    inputTask.style.display = 'block';
}

closeButton.onclick = () => {
    inputTask.style.display = 'none';
    addButton.style.display = 'block';
}

document.addEventListener('DOMContentLoaded', () => {
    let columns = Store.getColumns();
    let ui = new UI(columns);
    ui.render();
    ui.deleteTask()
    ui.deleteColumn();
    ui.draggedColumn()
})
