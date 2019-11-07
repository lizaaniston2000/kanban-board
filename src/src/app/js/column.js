const inputTask = document.querySelectorAll('.input-task');
 import {clickBut, hideForm} from './card'
clickBut()
hideForm() 

class Column {
    constructor(col_name) {
        this.col_name = col_name;
    }
}
class columnUI {
    static displayColumn() {
        const columns = Store.getColumn();
        columns.forEach((column) => columnUI.newColumn(column));
    }
    static newColumn(column) {
        /* const add_task = document.getElementById('add-task')
        const input_task =  document.getElementById('new_task') */
        const main_cont = document.querySelector('.kanban_board')
        const clone_card = document.createElement('div')
        clone_card.className = 'card'
        clone_card.id = 'new_card'
        /* const ready_card = document.getElementById('new_card') */
        clone_card.innerHTML = `
        <h3>${column.col_name}</h3> `
        main_cont.appendChild(clone_card)
        /* ready_card.appendChild(add_task)
        ready_card.appendChild(input_task) */
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
        columnUI.newColumn(column);
        Store.addColumn(column);
    }
})
