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
    static pushTaskToColumn(column_id, oldColumnId, task_id, i, old) {
        const columns = Store.getColumns();
        let elem = columns.find((i) => i.state.id == column_id);
        let updatingList = elem.state.task_list;
        let oldColumn = columns.find((i) => i.state.id == oldColumnId);
        let oldColumnTaskList = oldColumn.state.task_list;
        let getElem = oldColumnTaskList.find((i) => i.state.id == task_id)
        let index = oldColumnTaskList.indexOf(getElem);
        if (oldColumnTaskList == updatingList) {
            oldColumnTaskList.splice(old, 1);
            oldColumnTaskList.splice(i, 0, getElem);
        }
        else {
            updatingList.splice(i, 0, getElem);
            if (index != -1) {
                oldColumnTaskList.splice(index, 1);
            }
        }
        localStorage.setItem('columns', JSON.stringify(columns));
    }
    static addColumn(column) {
        const columns = Store.getColumns();
        columns.push(column);
        localStorage.setItem('columns', JSON.stringify(columns));
    }
    static sortColumn(elem_id, new_i, old_i) {
        const columns = Store.getColumns();
        let elem = columns.find((i) => i.state.id == elem_id)
        columns.splice(old_i, 1);
        columns.splice(new_i, 0, elem);
        localStorage.setItem('columns', JSON.stringify(columns));
    }
    static AddtaskList(task) {
        let columns = this.getColumns();
        for (let i = 0; i < columns.length; i++) {
            if (columns[i].state.id == task.state.column_id) {
                columns[i].state.task_list.push(task);
            }
        }
        localStorage.setItem('columns', JSON.stringify(columns));
    }
    static deleteElementTaskList(column_id, task_id) {
        let columns = Store.getColumns();
        let elem = columns.find((i) => i.state.id == column_id);
        let arr = elem.state.task_list;
        let task = arr.find((i) => i.state.id == task_id);
        let index = arr.indexOf(task);
        if (index !== -1) {
            arr.splice(index, 1);
            localStorage.setItem('columns', JSON.stringify(columns));
        }
    }
    static deleteColumn(column_id) {
        let columns = Store.getColumns();
        let elem = columns.find((i) => i.state.id == column_id);
        let index = columns.indexOf(elem);
        if (index !== -1) {
            columns.splice(index, 1)
            localStorage.setItem('columns', JSON.stringify(columns));
        }
    }
}