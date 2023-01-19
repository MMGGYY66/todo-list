// Todo APP
import './styles/main.scss'
import Refresh from './rotate.svg';
import Enter from './enter.png';
import { appendToDOM } from './modules/handleDOM.js';
import createShowElement from './modules/showTodo.js';
import { getData } from './modules/data.js';
import { newTodoForm, newTodoFormHandler } from './modules/newTodoForm.js';
import clearAllCompletedHandler from './modules/clearAllCompletedHandler.js';

const loadElements = () => {
  let todoArray = [];
  todoArray = getData();
  todoArray
    .sort((a, b) => a.index - b.index)
    .forEach((todo) => {
      const todoElement = createShowElement(todo);
      appendToDOM(todoElement);
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

const loadClearAllCompletedLink = () => {
  const footer = document.getElementsByTagName('footer')[0];
  const clearAllCompletedLink = document.createElement('a');
  clearAllCompletedLink.setAttribute('id', 'clear-all-completed');
  clearAllCompletedLink.setAttribute('href', '/');
  clearAllCompletedLink.innerText = 'Clear all completed';
  clearAllCompletedLink.addEventListener('click', clearAllCompletedHandler);
  footer.appendChild(clearAllCompletedLink);
};

window.onload = () => {
  loadElements();
  loadRefreshBtn();
  loadEnterBtn();
  loadClearAllCompletedLink();
  newTodoForm.addEventListener('submit', newTodoFormHandler);
};

