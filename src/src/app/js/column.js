import { Store } from './store'
import { Card } from './card'
import { UI } from './ui'
export class Column {
    constructor(props) {
        this.state = {
            col_name: props.col_name,
            id: props.id || Number(new Date()).toString(36),
            task_list: props.task_list || []
        }
    }
    template() {
        return `<div class="card" id="${this.state.id}">
            <h3>${this.state.col_name} <img src="./img/cross.png" alt="" class="delete" id="delete-${this.state.id}"></h3>
            <div class="task-list">
                <div class="task-container" id="tasks${this.state.id}">
                    <div class="pre_task"></div>
                    ${this.state.task_list.map(elem => {
                        let card = new Card(elem.state)
                        return card.renderTask()
                    }).join('')}
                </div>
            </div>
            <div class="add-task" id ="add-task-${this.state.id}">
                <div>
                    <img src="./img/Vector.png" alt="">
                    <span>Add one more card</span>
                </div>
            </div>
            <form action="" class="input-task" id="new_task${this.state.id}">
                <div class="input_container">
                    <input class="input"  id="task_name${this.state.id}" type="text" placeholder="Please, input name of the card">
                </div>
                <div class="button_container">
                    <button type="submit" class="task-button">Add card</button>
                    <img src="./img/cross.png" alt="" class="close" id="close${this.state.id}">
                </div>
            </form>
        </div>`
    }
}


const new_column = document.getElementById('new_column')

new_column.addEventListener('submit', (e) => {
    e.preventDefault();
    const col_name = document.querySelector('#col_name').value;
    if (col_name === '') {
        document.querySelector('.error_alert').style.display = 'block'
        document.querySelector('.error_alert').onclick = (e) => {
            if (e.target.className == 'task-button') {
                document.querySelector('.error_alert').style.display = 'none'
            }
        }
    }
    else {
        const column = new Column({ col_name });
        document.querySelector('#col_name').value = '';
        Store.addColumn(column);
        document.querySelector('.column_list').innerHTML += column.template();
        document.querySelector('#col_name').value = '';
        let columns = Store.getColumns();
        let ui = new UI(columns);
        ui.render();
        ui.deleteColumn();
    }
})





