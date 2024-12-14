const inputText = document.querySelector('.inputText').value;
const addBtn = document.querySelector('#addBtn');
let taskList = document.querySelector('#taskList');

class Task {
  constructor(name, mark) {
    this.name = name;
    this.mark = mark;
  }

  defineTask() {
    // create an element
  }
}

function emptyTaskContainer() {
  addBtn.addEventListener('click', () => {
    if (taskList.children.length > 0) {
      document.querySelector('#emptyTaskContainer').style.display = 'none';
    } else if (taskList.children.length <= 0) {
      /* no-op */
    }
  })
}
function createTask() {
  emptyTaskContainer();
}
createTask()
console.log(taskList.children.length)
// In this element todo-container, make an if else statement. if the element todo-container has 5 values inside, remove the emptyTaskContainer, if value 4, add.

