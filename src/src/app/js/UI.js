import { Store } from './store'
import { Column } from './column'
const errorMessage = document.getElementById('error') 

export class UI {
    static displayColumn() {
        const columns = Store.getColumns();
        columns.forEach((column) => {
            Column.newColumn(column);
        })
    }
    static createColumn() {
        const col_name = document.querySelector('#col_name').value;
        if (col_name === '') {
            errorMessage.style.display = 'block';
            errorMessage.onclick = (e) => {
                let target = e.target;
                if(target.className = 'task-button') {
                    errorMessage.style.display = 'none';
                }
            }
        }
        else {
            const column = new Column(col_name);
            Store.addColumn(column);
            Column.newColumn(column);
            document.querySelector('#col_name').value = '';
        }
    }
}