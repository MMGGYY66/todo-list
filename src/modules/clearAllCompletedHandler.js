import { getData, storeData } from './data.js';
import Todo from './todo.js';
const clearAllCompletedHandler = (e) => {
  e.preventDefault();
  let todosList = getData();
  todosList.forEach((element) => {
    if (element.completed) {
      todosList = todosList.filter((todo) => todo.index.toString() !== element.index.toString());
    }
  });
  const reIndexedArray = [];
  todosList.sort((a, b) => a.index - b.index).forEach((element, index) => {
    reIndexedArray.push(new Todo(element.description, element.completed, index + 1));
  });
  storeData(reIndexedArray);
  window.location.reload();
};
export default clearAllCompletedHandler;
