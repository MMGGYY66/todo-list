// Todo APP
import './styles/main.scss'

import Edit from './ellipsis-vertical.svg';
import Refresh from './rotate.svg';
import Enter from './enter.png';

const todoslist = document.getElementById('todoslist');

const todoList = [
  {
    description: 'Clean my house',
    completed: true,
    index: 11,
  },
  {
    description: 'Finish my today project',
    completed: false,
    index: 2,
  },
  {
    description: 'Have some fun with my kids',
    completed: true,
    index: 1,
  },
];

const displayTodos = (todo) => {
  const element = document.createElement('li');
  const editIcon = new Image();
  editIcon.src = Edit;
  editIcon.setAttribute('class', 'icon');

  element.setAttribute('id', todo.index);
  element.innerHTML = `
  <label>
    <input class="checkbox" type="checkbox" ${todo.completed ? 'checked' : ''}/>
    <span>${todo.description}</span>
  </label
  `;
  element.appendChild(editIcon);
  todoslist.appendChild(element);
};

const loadElements = () => {
  todoList
    .sort((a, b) => a.index - b.index)
    .forEach((todo) => {
      displayTodos(todo);
    });
};

const loadRefreshBtn = () => {
  const refreshBtn = document.getElementById('refresh');
  refreshBtn.src = Refresh;
  refreshBtn.alt = 'refresh';
  refreshBtn.setAttribute('class', 'header-icon');
};

const loadEnterBtn = () => {
  const enterBtn = document.getElementById('enter');
  enterBtn.src = Enter;
  enterBtn.alt = 'enter';
  enterBtn.setAttribute('class', 'icon');
};

window.onload = () => {
  loadElements();
  loadRefreshBtn();
  loadEnterBtn();
};
