export class Store {
    static getColumns() {
        let columns;
        if (localStorage.getItem('columns') === null) {
            columns = [];
        } else {
            columns = JSON.parse(localStorage.getItem('columns'));
        }
        return columns;
    }
    static AddtaskList (task) {
        let columns = this.getColumns();
        for(let i=0; i<columns.length; i++) { 
            if (columns[i].id == task.column_id) {
                columns[i].task_list.push(task);
            }
        }
        localStorage.setItem('columns', JSON.stringify(columns));
    }
    static deleteElementTaskList (cards, task) {
        for(let i = 0; i<cards.length; i++) {
            if(cards[i].id == task.id) {
                let index = cards.indexOf(cards[i])
                if (index !== -1) {
                    cards.splice(index,1)
                    let columns = JSON.parse(localStorage.getItem('columns'))
                    for(let i=0; i<columns.length; i++) {
                        columns[i].task_list = cards;
                    }
                    localStorage.setItem('columns', JSON.stringify(columns));
                } 
            }
        }
    }
    static taskList(column_id) {
        let columns = JSON.parse(localStorage.getItem('columns'))
        for(let i=0; i<columns.length; i++) {
            if (columns[i].id == column_id) {
                return columns[i].task_list;
            }
        }
        return [];
    } 
    static getColumnIndex(column_id) {
        let columns = Store.getColumns();
        for(let i=0; i<columns.length; i++) {
            if (columns[i].id == column_id) {
               return i;
            }
        } 
    }
   static deleteColumn (column_id) {
        let index = Store.getColumnIndex(column_id)
        let columns = Store.getColumns() 
        columns.splice(index,1);
        localStorage.setItem('columns', JSON.stringify(columns));
    } 
    static addColumn(column) { 
        const columns = Store.getColumns();
        columns.push(column);
        localStorage.setItem('columns', JSON.stringify(columns));
    } 
}