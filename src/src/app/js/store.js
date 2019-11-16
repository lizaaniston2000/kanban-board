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
        }
        localStorage.setItem('columns', JSON.stringify(columns));
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
    static getColumnIndex(column_id) {
        const columns = Store.getColumns();
        for(let i=0; i<columns.length; i++) {
            if (columns[i].id == column_id) {
                return i
            }
        }
    }
    static addColumn(column) {
        const columns = Store.getColumns();
        columns.push(column);
        localStorage.setItem('columns', JSON.stringify(columns));
    } 

}