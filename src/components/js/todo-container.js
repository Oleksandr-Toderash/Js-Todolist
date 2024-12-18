const inputTextValue = document.querySelector('.inputText').value;
const inputText = document.querySelector('.inputText');
const addBtn = document.querySelector('#addBtn');
const addBtn2 = document.querySelector('#addBtn2');
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
    pNameClassElem.classList.add('textName');

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

function newTask() {
  // Do nothing if input is empty
  if (inputText.value.trim().length === 0) {
    return;
  }

  // create a task
  if (taskList.children.length >= 0) {
    const newTask = new Task(inputText.value).defineTask();
    taskList.appendChild(newTask);
    document.querySelector('#emptyTaskContainer').style.display = 'none';
  }

  inputText.value = ''
}



function btnNavigarion() {
  addBtn2.addEventListener('click', () => {
    inputText.focus();
  });
}

function createTask() {
  addBtn.addEventListener('click', () => {
    newTask();
  })

  inputText.addEventListener('keydown', (event) => {
    if (event.key === "Enter") {
      newTask();
    }
  })
  btnNavigarion();

  taskList.addEventListener('dblclick', (event) => {
    if (event.target.classList.contains('textName')) {
      let currentText = event.target.textContent;

      const inputElem = document.createElement('input');
      inputElem.type = 'text';
      inputElem.value = event.target.textContent;
      inputElem.classList.add('textName');
      inputElem.style.paddingLeft = '3rem';
      inputElem.style.borderWidth = '3px';
      inputElem.style.borderRadius = '0.5rem'
      inputElem.style.borderColor = 'black';

      event.target.replaceWith(inputElem);

      inputElem.focus();

      inputElem.addEventListener('blur', () => {
        const newText = inputElem.value;

        const pElem = document.createElement('p');
        pElem.textContent = newText;
        pElem.className = 'textName';
        pElem.style.paddingLeft = '3rem';

        inputElem.replaceWith(pElem);
        if (pElem.textContent == '') {
          pElem.textContent = currentText;
        }
      });

      inputElem.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          inputElem.blur();
        }
      });
    }
  });
}

createTask()

