const inputTextValue = document.querySelector('.inputText').value;
const inputText = document.querySelector('.inputText');
const addBtn = document.querySelector('#addBtn');
let taskList = document.querySelector('#taskList');

class Task {
  constructor(name) {
    this.name = name;
  }

  defineTask() {
    // create an element
    const divClassElem = document.createElement('div');
    divClassElem.classList.add('task-container');

    const pNameClassElem = document.createElement('p');
    pNameClassElem.style.paddingLeft = '3rem';
    pNameClassElem.textContent = this.name;

    const pMarkClassElem = document.createElement('p');
    pMarkClassElem.classList.add('task-status');
    pMarkClassElem.textContent = 'Pending';

    const divIconClassElem = document.createElement('div');
    divIconClassElem.classList.add('tasklist');


    const imgClassElem = document.createElement('img');
    imgClassElem.classList.add('delete-icon-box');
    imgClassElem.src = 'https://cdn-icons-png.flaticon.com/512/5972/5972943.png'

    divIconClassElem.append(imgClassElem)

    divClassElem.appendChild(pNameClassElem)
    divClassElem.appendChild(pMarkClassElem)
    divClassElem.appendChild(divIconClassElem)

    return divClassElem;
  }
}

function emptyTaskContainer() {
  document.querySelector('#emptyTaskContainer').style.display = 'none';
}

function newTask() {
  addBtn.addEventListener('click', () => {
    if (inputText.value.trim().length === 0) {
      // Do nothing if input is empty
      return;
    }

    // create a task
    if (taskList.children.length >= 0) {
      const newTask = new Task(inputText.value).defineTask();
      taskList.appendChild(newTask);
      emptyTaskContainer()
    }

    inputText.value = ''
  })

  if (taskList.children.length > 0) {
    emptyTaskContainer();
  }
}

function createTask() {
  newTask();
}

createTask();

