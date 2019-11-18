import "../style/app.scss"
import "./js/card"
import "./js/column"

const addButton = document.querySelector('.add-task');
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