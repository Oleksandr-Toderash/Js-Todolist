const inputTextValue = document.querySelector('.inputText').value;
const inputText = document.querySelector('.inputText');
const addBtn = document.querySelector('#addBtn');
const addBtn2 = document.querySelector('#addBtn2');
let taskList = document.querySelector('#taskList');

// wallpaper button
const wallpaperBtn = document.querySelector('#wallpaperBtn');
const wallpaperImgElem = document.querySelectorAll('.wallpaper-block-img');

class Task {
  constructor(name) {
    this.name = name;
    this.imgClassElem = '';
  }

  defineTask() {
    // create an element
    const divClassElem = document.createElement('div');
    divClassElem.classList.add('task-container');

    const pNameClassElem = document.createElement('p');
    pNameClassElem.style.paddingLeft = '3rem';
    pNameClassElem.textContent = this.name;
    pNameClassElem.classList.add('textName');

    const pMarkOptionBox = document.createElement('div');
    pMarkOptionBox.classList.add('status-option-box')
    pMarkOptionBox.style.background = 'none'

    const pMarkClassElem = document.createElement('p');
    pMarkClassElem.classList.add('task-status');
    pMarkClassElem.classList.add('to-do')
    pMarkClassElem.textContent = 'To do';

    const statusMenuElem = document.createElement('ul');
    statusMenuElem.classList.add('status-menu');
    statusMenuElem.style.display = 'none';

    const statuses = ['Done', 'Pending', 'To do'];
    statuses.forEach(status => {
      const statusItem = document.createElement('ul');
      statusItem.classList.add('status-item')
      statusItem.textContent = status;
      statusItem.addEventListener('click', () => {
        pMarkClassElem.textContent = status;

        if (status === 'To do') {
          pMarkClassElem.classList.add('to-do');
          pMarkClassElem.classList.remove('pending');
          pMarkClassElem.classList.remove('done');
          pMarkClassElem.style.display = 'block';
        } else if (status === 'Pending') {
          pMarkClassElem.classList.add('pending');
          pMarkClassElem.classList.remove('to-do');
          pMarkClassElem.classList.remove('done');
          pMarkClassElem.style.display = 'block';
        } else if (status === 'Done') {
          pMarkClassElem.classList.add('done');
          pMarkClassElem.classList.remove('pending');
          pMarkClassElem.classList.remove('to-do');
          pMarkClassElem.style.display = 'block'
        }

        statusMenuElem.style.display = 'none';
        pMarkOptionBox.style.background = 'none'
        saveTasksToLocalStorage()
      })
      statusMenuElem.appendChild(statusItem);
    })

    pMarkClassElem.addEventListener('click', () => {
      statusMenuElem.style.display = statusMenuElem.style.display === 'none' ? 'flex' : 'none';
      pMarkClassElem.style.display = 'none';
      pMarkOptionBox.style.background = ' #dbdbdb'
    })

    const divIconClassElem = document.createElement('div');
    divIconClassElem.classList.add('tasklist');


    const imgClassElem = document.createElement('img');
    imgClassElem.classList.add('delete-icon-box');
    imgClassElem.src = 'https://cdn-icons-png.flaticon.com/512/5972/5972943.png'
    imgClassElem.addEventListener('click', () => {
      const tasks = Array.from(taskList.children).filter((task) => task !== divClassElem);

      taskList.innerHTML = '';
      tasks.forEach((task) => taskList.appendChild(task));

      saveTasksToLocalStorage();
    });


    divIconClassElem.append(imgClassElem)
    pMarkOptionBox.appendChild(statusMenuElem)
    pMarkOptionBox.appendChild(pMarkClassElem)

    divClassElem.appendChild(pNameClassElem)
    divClassElem.appendChild(pMarkOptionBox)
    divClassElem.appendChild(divIconClassElem)

    return divClassElem;
  }
}

function saveTasksToLocalStorage() {
  const tasks = [];
  taskList.querySelectorAll('.task-container').forEach((taskElem) => {
    const name = taskElem.querySelector('.textName').textContent;
    const status = taskElem.querySelector('.task-status').textContent;
    tasks.push({ name, status });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasksFromLocalStorage() {
  const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
  storedTasks.forEach(({ name, status }) => {
    const task = new Task(name);
    const taskElem = task.defineTask();
    const statusElem = taskElem.querySelector('.task-status');

    statusElem.textContent = status;
    statusElem.classList.add(status.toLowerCase().replace(' ', '-'));
    taskList.appendChild(taskElem);
  });
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
    saveTasksToLocalStorage()
  }

  inputText.value = ''
}

loadTasksFromLocalStorage()


function btnNavigation() {
  addBtn2.addEventListener('click', () => {
    inputText.focus();
  });
}

function deleteTask() {
  taskList.addEventListener('click', (event) => {
    if (event.target && event.target.classList.contains('delete-icon-box')) {
      const taskContainer = event.target.closest('.task-container');
      if (taskContainer) {
        taskContainer.remove();

        if (taskList.children.length === 0) {
          document.querySelector('#emptyTaskContainer').style.removeProperty('display');
        }
      }
    }
  })
}

export function createTask() {
  addBtn.addEventListener('click', () => {
    newTask();
  })

  if (taskList.children.length > 0) {
    document.querySelector('#emptyTaskContainer').style.display = 'none';
  }

  inputText.addEventListener('keydown', (event) => {
    if (event.key === "Enter") {
      newTask();
    }
  })
  btnNavigation();
  deleteTask()


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

// wallpaper button

wallpaperBtn.addEventListener('click', openWallpaperBox)

function openWallpaperBox() {
  document.querySelector('.wallpaper-container').classList.toggle('active');
  document.querySelector('.wallpaper-block').classList.toggle('active')
}


wallpaperImgElem.forEach(img => {
  img.addEventListener('click', () => {
    const imgBody = img.src;
    localStorage.setItem('imgBody', imgBody);
    document.body.style.backgroundImage = `url(${imgBody})`;
    document.querySelector('.wallpaper-container').classList.toggle('active');
    document.querySelector('.wallpaper-block').classList.toggle('active')
  })
})

const savedImgBody = localStorage.getItem('imgBody');

document.body.style.backgroundImage = `url(${savedImgBody})`;


