const addButton = document.querySelector('.add-task');
const inputTask = document.querySelector('.input-task');
const closeButton = document.querySelector('.close');

inputTask.style.display = 'none';

addButton.addEventListener('click', () => {
    inputTask.style.display = 'block'
    addButton.style.display = 'none'
});
closeButton.addEventListener('click', () => {
    inputTask.style.display = 'none'
    addButton.style.display = 'block';
});

