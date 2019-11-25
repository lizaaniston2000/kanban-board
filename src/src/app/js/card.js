export class Card {
    constructor(props) {
        this.state = {
            description: props.description,
            id: props.id || Number(new Date()).toString(36),
            column_id: props.column_id
        }
    }
    renderTask() {
        let self = this
        return `<div class="task" id=${self.state.id}>
            <p>${self.state.description}</p>
            <img src="./img/cross.png" alt="" class="cansel" id="cansel-${self.state.id}">
        </div>`
    }
}

