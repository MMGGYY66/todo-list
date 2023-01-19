/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/modules/checkbox.js":
/*!*********************************!*\
  !*** ./src/modules/checkbox.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _todo_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./todo.js */ "./src/modules/todo.js");


var checkbox = function checkbox(e) {
  var showElement = e.target.parentElement.parentElement;
  var todoIndex = showElement.getAttribute('id');
  var todo = _todo_js__WEBPACK_IMPORTED_MODULE_0__["default"].getTodo(todoIndex);
  todo.completed = !todo.completed;

  if (todo.completed) {
    showElement.classList.add('completed');
  } else {
    showElement.classList.remove('completed');
  }

  _todo_js__WEBPACK_IMPORTED_MODULE_0__["default"].updateTodo(todo);
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (checkbox);

/***/ }),

/***/ "./src/modules/checkboxElement.js":
/*!****************************************!*\
  !*** ./src/modules/checkboxElement.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _checkbox_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./checkbox.js */ "./src/modules/checkbox.js");


var createCheckboxElement = function createCheckboxElement(checked) {
  var checkboxElement = document.createElement('input');
  checkboxElement.setAttribute('class', 'checkbox');
  checkboxElement.setAttribute('type', 'checkbox');

  if (checked) {
    checkboxElement.checked = true;
  }

  checkboxElement.addEventListener('change', _checkbox_js__WEBPACK_IMPORTED_MODULE_0__["default"]);
  return checkboxElement;
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createCheckboxElement);

/***/ }),

/***/ "./src/modules/clearAllCompletedHandler.js":
/*!*************************************************!*\
  !*** ./src/modules/clearAllCompletedHandler.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _data_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./data.js */ "./src/modules/data.js");
/* harmony import */ var _todo_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./todo.js */ "./src/modules/todo.js");



var clearAllCompletedHandler = function clearAllCompletedHandler(e) {
  e.preventDefault();
  var todosList = (0,_data_js__WEBPACK_IMPORTED_MODULE_0__.getData)();
  todosList.forEach(function (element) {
    if (element.completed) {
      todosList = todosList.filter(function (todo) {
        return todo.index.toString() !== element.index.toString();
      });
    }
  });
  var reIndexedArray = [];
  todosList.sort(function (a, b) {
    return a.index - b.index;
  }).forEach(function (element, index) {
    reIndexedArray.push(new _todo_js__WEBPACK_IMPORTED_MODULE_1__["default"](element.description, element.completed, index + 1));
  });
  (0,_data_js__WEBPACK_IMPORTED_MODULE_0__.storeData)(reIndexedArray);
  window.location.reload();
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (clearAllCompletedHandler);

/***/ }),

/***/ "./src/modules/data.js":
/*!*****************************!*\
  !*** ./src/modules/data.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getData": () => (/* binding */ getData),
/* harmony export */   "storeData": () => (/* binding */ storeData)
/* harmony export */ });
// Check if local storage available
var storageAvailable = function storageAvailable(type) {
  var storage;

  try {
    storage = window[type];
    var x = '__storage_test__';
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return e instanceof DOMException && (e.code === 22 || e.code === 1014 || e.name === 'QuotaExceededError' || e.name === 'NS_ERROR_DOM_QUOTA_REACHED') && storage && storage.length !== 0;
  }
};

var availableStorage;
var todos = [];

if (storageAvailable('localStorage')) {
  availableStorage = window.localStorage;
} else {
  availableStorage = null;
}

var getData = function getData() {
  if (availableStorage.getItem('todos')) {
    var todosData = availableStorage.getItem('todos');
    todos = JSON.parse(todosData);
  }

  return todos;
};
var storeData = function storeData(todosArray) {
  if (availableStorage) {
    var jsonData = JSON.stringify(todosArray);
    availableStorage.setItem('todos', jsonData);
  }
};

/***/ }),

/***/ "./src/modules/editHandler.js":
/*!************************************!*\
  !*** ./src/modules/editHandler.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _images_ellipsis_vertical_svg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../images/ellipsis-vertical.svg */ "./src/images/ellipsis-vertical.svg");
/* harmony import */ var _editTodo_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./editTodo.js */ "./src/modules/editTodo.js");
/* harmony import */ var _todo_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./todo.js */ "./src/modules/todo.js");
/* harmony import */ var _checkboxElement_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./checkboxElement.js */ "./src/modules/checkboxElement.js");





var editHandler = function editHandler(e) {
  e.preventDefault(); // Update Todo

  var inputElement = document.getElementsByClassName('edit-todo-input')[0];
  var formElement = inputElement.parentElement.parentElement;
  var indexTodo = formElement.getAttribute('id');
  var todo = _todo_js__WEBPACK_IMPORTED_MODULE_2__["default"].getTodo(indexTodo);
  todo.description = inputElement.value;
  _todo_js__WEBPACK_IMPORTED_MODULE_2__["default"].updateTodo(todo); // Create showElement

  var showElement = document.createElement('li');
  showElement.setAttribute('id', todo.index); // Create menuElement

  var menuElement = new Image();
  menuElement.src = _images_ellipsis_vertical_svg__WEBPACK_IMPORTED_MODULE_0__;
  menuElement.setAttribute('class', 'icon'); // Add menuElement eventListener

  menuElement.addEventListener('click', function (e) {
    var showElement = e.target.parentElement;
    var indexTodo = showElement.getAttribute('id');
    var editElement = (0,_editTodo_js__WEBPACK_IMPORTED_MODULE_1__["default"])(indexTodo);
    editElement.addEventListener('submit', editHandler);
    var todoList = showElement.parentElement;
    todoList.replaceChild(editElement, showElement);
  });
  var labelElement = document.createElement('label');
  var checkboxElement = (0,_checkboxElement_js__WEBPACK_IMPORTED_MODULE_3__["default"])(todo.completed);

  if (todo.completed) {
    showElement.classList.add('completed');
  } else {
    showElement.classList.remove('completed');
  }

  labelElement.appendChild(checkboxElement);
  var descriptionElement = document.createElement('span');
  descriptionElement.innerText = todo.description;
  labelElement.appendChild(descriptionElement);
  showElement.appendChild(labelElement);
  showElement.appendChild(menuElement);
  formElement.parentElement.replaceChild(showElement, formElement);
  return showElement;
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (editHandler);

/***/ }),

/***/ "./src/modules/editTodo.js":
/*!*********************************!*\
  !*** ./src/modules/editTodo.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _todo_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./todo.js */ "./src/modules/todo.js");
/* harmony import */ var _images_trash_can_svg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../images/trash-can.svg */ "./src/images/trash-can.svg");
/* harmony import */ var _trashHandler_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./trashHandler.js */ "./src/modules/trashHandler.js");
/* harmony import */ var _checkboxElement_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./checkboxElement.js */ "./src/modules/checkboxElement.js");





var createDescriptionElement = function createDescriptionElement(description) {
  var descriptionElement = document.createElement('input');
  descriptionElement.setAttribute('type', 'text');
  descriptionElement.setAttribute('name', 'edit-todo');
  descriptionElement.setAttribute('class', 'edit-todo-input');
  descriptionElement.setAttribute('value', description);
  return descriptionElement;
};

var createTrashElement = function createTrashElement() {
  var trashElement = new Image();
  trashElement.src = _images_trash_can_svg__WEBPACK_IMPORTED_MODULE_1__;
  trashElement.setAttribute('class', 'icon');
  trashElement.addEventListener('click', _trashHandler_js__WEBPACK_IMPORTED_MODULE_2__["default"]);
  return trashElement;
};

var createEditElement = function createEditElement(indexTodo) {
  var todo = _todo_js__WEBPACK_IMPORTED_MODULE_0__["default"].getTodo(indexTodo);
  var editElement = document.createElement('form');
  editElement.setAttribute('action', '#');
  editElement.setAttribute('method', 'patch');
  editElement.setAttribute('type', 'submit');
  editElement.setAttribute('class', 'edit-todo-form');
  editElement.setAttribute('id', indexTodo);
  var labelElement = document.createElement('label');
  labelElement.setAttribute('for', 'edit-todo');
  labelElement.setAttribute('id', 'edit-todo-label');
  var checkboxElement = (0,_checkboxElement_js__WEBPACK_IMPORTED_MODULE_3__["default"])(todo.completed);

  if (todo.completed) {
    editElement.classList.add('completed');
  } else {
    editElement.classList.remove('completed');
  }

  labelElement.appendChild(checkboxElement);
  var descriptionElement = createDescriptionElement(todo.description);
  labelElement.appendChild(descriptionElement);
  var trashElement = createTrashElement();
  editElement.appendChild(labelElement);
  editElement.appendChild(trashElement);
  return editElement;
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createEditElement);

/***/ }),

/***/ "./src/modules/handleDOM.js":
/*!**********************************!*\
  !*** ./src/modules/handleDOM.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "appendToDOM": () => (/* binding */ appendToDOM),
/* harmony export */   "removeFromDOM": () => (/* binding */ removeFromDOM)
/* harmony export */ });
var todoList = document.getElementById('todoslist');
var removeFromDOM = function removeFromDOM(todo) {
  todo.parentElement.removeChild(todo);
};
var appendToDOM = function appendToDOM(todoElement) {
  todoList.appendChild(todoElement);
};

/***/ }),

/***/ "./src/modules/newTodoForm.js":
/*!************************************!*\
  !*** ./src/modules/newTodoForm.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "newTodoForm": () => (/* binding */ newTodoForm),
/* harmony export */   "newTodoFormHandler": () => (/* binding */ newTodoFormHandler)
/* harmony export */ });
/* harmony import */ var _todo_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./todo.js */ "./src/modules/todo.js");
/* harmony import */ var _handleDOM_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./handleDOM.js */ "./src/modules/handleDOM.js");
/* harmony import */ var _showTodo_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./showTodo.js */ "./src/modules/showTodo.js");
/* harmony import */ var _data_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./data.js */ "./src/modules/data.js");




var newTodoForm = document.getElementById('todo-form');
var newTodoFormHandler = function newTodoFormHandler(e) {
  e.preventDefault();
  var todosArray = (0,_data_js__WEBPACK_IMPORTED_MODULE_3__.getData)();
  var newTodo = new _todo_js__WEBPACK_IMPORTED_MODULE_0__["default"](newTodoForm.elements['add-todo'].value, false, todosArray.length + 1);
  _todo_js__WEBPACK_IMPORTED_MODULE_0__["default"].addTodo(newTodo);
  var todoElement = (0,_showTodo_js__WEBPACK_IMPORTED_MODULE_2__["default"])(newTodo);
  (0,_handleDOM_js__WEBPACK_IMPORTED_MODULE_1__.appendToDOM)(todoElement);
  newTodoForm.reset();
};

/***/ }),

/***/ "./src/modules/showTodo.js":
/*!*********************************!*\
  !*** ./src/modules/showTodo.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _images_ellipsis_vertical_svg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../images/ellipsis-vertical.svg */ "./src/images/ellipsis-vertical.svg");
/* harmony import */ var _editTodo_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./editTodo.js */ "./src/modules/editTodo.js");
/* harmony import */ var _editHandler_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./editHandler.js */ "./src/modules/editHandler.js");
/* harmony import */ var _checkboxElement_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./checkboxElement.js */ "./src/modules/checkboxElement.js");





var clickMenuHandler = function clickMenuHandler(e) {
  var showElement = e.target.parentElement;
  var indexTodo = showElement.getAttribute('id');
  var editElement = (0,_editTodo_js__WEBPACK_IMPORTED_MODULE_1__["default"])(indexTodo);
  editElement.addEventListener('submit', _editHandler_js__WEBPACK_IMPORTED_MODULE_2__["default"]);
  var todoList = showElement.parentElement;
  todoList.replaceChild(editElement, showElement);
};

var createMenuElement = function createMenuElement() {
  var menuElement = new Image();
  menuElement.src = _images_ellipsis_vertical_svg__WEBPACK_IMPORTED_MODULE_0__;
  menuElement.setAttribute('class', 'icon');
  menuElement.addEventListener('click', clickMenuHandler);
  return menuElement;
};

var createShowElement = function createShowElement(todo) {
  var showElement = document.createElement('li');
  showElement.setAttribute('id', todo.index);
  var labelElement = document.createElement('label');
  var checkboxElement = (0,_checkboxElement_js__WEBPACK_IMPORTED_MODULE_3__["default"])(todo.completed);

  if (todo.completed) {
    showElement.classList.add('completed');
  } else {
    showElement.classList.remove('completed');
  }

  labelElement.appendChild(checkboxElement);
  var descriptionElement = document.createElement('span');
  descriptionElement.innerText = todo.description;
  labelElement.appendChild(descriptionElement);
  showElement.appendChild(labelElement);
  var menuElement = createMenuElement();
  showElement.appendChild(menuElement);
  return showElement;
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createShowElement);

/***/ }),

/***/ "./src/modules/todo.js":
/*!*****************************!*\
  !*** ./src/modules/todo.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Todo)
/* harmony export */ });
/* harmony import */ var _data_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./data.js */ "./src/modules/data.js");
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


var newTodoArray = [];

var Todo = /*#__PURE__*/_createClass(function Todo(description, completed, index) {
  _classCallCheck(this, Todo);

  this.description = description;
  this.completed = completed;
  this.index = index;
});

_defineProperty(Todo, "getTodo", function (index) {
  newTodoArray = (0,_data_js__WEBPACK_IMPORTED_MODULE_0__.getData)();
  var todo = newTodoArray.find(function (x) {
    return x.index.toString() === index.toString();
  });
  return todo;
});

_defineProperty(Todo, "addTodo", function (todo) {
  var newTodo = new Todo(todo.description, todo.completed, todo.index);
  newTodoArray = (0,_data_js__WEBPACK_IMPORTED_MODULE_0__.getData)();
  newTodoArray.push(newTodo);
  (0,_data_js__WEBPACK_IMPORTED_MODULE_0__.storeData)(newTodoArray);
});

_defineProperty(Todo, "updateTodo", function (todo) {
  newTodoArray = (0,_data_js__WEBPACK_IMPORTED_MODULE_0__.getData)();
  newTodoArray = newTodoArray.filter(function (element) {
    return element.index !== todo.index;
  });
  var newTodo = new Todo(todo.description, todo.completed, todo.index);
  newTodoArray.push(newTodo);
  (0,_data_js__WEBPACK_IMPORTED_MODULE_0__.storeData)(newTodoArray);
});

_defineProperty(Todo, "removeTodo", function (index) {
  newTodoArray = (0,_data_js__WEBPACK_IMPORTED_MODULE_0__.getData)();
  newTodoArray = newTodoArray.filter(function (element) {
    return element.index.toString() !== index.toString();
  });
  var reIndexedArray = [];
  newTodoArray.sort(function (a, b) {
    return a.index - b.index;
  }).forEach(function (element, index) {
    reIndexedArray.push(new Todo(element.description, element.completed, index + 1));
  });
  (0,_data_js__WEBPACK_IMPORTED_MODULE_0__.storeData)(reIndexedArray);
  window.location.reload();
});



/***/ }),

/***/ "./src/modules/trashHandler.js":
/*!*************************************!*\
  !*** ./src/modules/trashHandler.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _todo_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./todo.js */ "./src/modules/todo.js");


var trashEventHandler = function trashEventHandler(e) {
  var todo = e.target.parentElement;
  var indexTodo = todo.getAttribute('id');
  _todo_js__WEBPACK_IMPORTED_MODULE_0__["default"].removeTodo(indexTodo);
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (trashEventHandler);

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/styles/main.scss":
/*!***********************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/styles/main.scss ***!
  \***********************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
___CSS_LOADER_EXPORT___.push([module.id, "@import url(https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap);"]);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "body {\n  background: #1d0404;\n  font-family: Roboto, sans-serif;\n  color: #410f0f;\n  height: 100%;\n  width: 100%;\n  font-size: 1rem;\n}\n\nmain {\n  margin: 5rem 5rem;\n  background: #f2ebeb;\n  border-radius: 20px 20px 0 0;\n  box-shadow: 10px 10px 20px #f6c5c5;\n  border: 1px solid #d5d5d5;\n  color: #240a0a;\n}\n\nmain > h1 {\n  font-weight: bold;\n  padding: 1.5rem;\n  margin: 0;\n  border-bottom: 1px solid #d5d5d5;\n  display: flex;\n  justify-content: space-between;\n}\n\n#add-label {\n  display: flex;\n  justify-content: space-between;\n  border-bottom: 1px solid #d5d5d5;\n  align-items: center;\n  background: #856363;\n  padding-right: 1.5rem;\n}\n\n#add-todo {\n  box-sizing: border-box;\n  margin: 0;\n  margin-right: 1.5rem;\n  font-size: 1.5rem;\n  font-style: italic;\n  background: #462222;\n  color: white;\n  padding: 1.5rem;\n  font-size: 1.9rem;\n  border: none;\n  width: 100%;\n}\n\n#add-todo:focus {\n  outline: none;\n}\n\nul {\n  margin: 0;\n  padding: 0;\n  list-style: none;\n}\n\nul > li {\n  padding: 1.5rem;\n  border-bottom: 1px solid #d5d5d5;\n  display: flex;\n  justify-content: space-between;\n}\n\nul > li > label {\n  display: flex;\n  gap: 1.5rem;\n  font-size: 2rem;\n}\n\n.checkbox {\n  height: 2rem;\n  width: 2rem;\n  margin: 0;\n}\n\nfooter {\n  background: #462222;\n  padding: 1.5rem;\n  display: flex;\n  font-size: 2rem;\n  justify-content: center;\n}\n\nfooter > a {\n  text-decoration: none;\n  color: #f2efed;\n  font-weight: bold;\n  color: #888;\n}\n\n.header-icon {\n  height: 2rem;\n}\n\n.icon {\n  height: 1rem;\n}\n\n.edit-todo-form {\n  background: lightyellow;\n  padding: 1.5rem;\n  border-bottom: 1px solid #d5d5d5;\n  display: flex;\n  justify-content: space-between;\n}\n\n.edit-todo-form > label {\n  display: flex;\n  gap: 1.5rem;\n}\n\n.edit-todo-input {\n  border: none;\n  background: lightyellow;\n  font-size: 2rem;\n}\n\n.edit-todo-input:focus {\n  outline: none;\n}\n\n.completed {\n  text-decoration: line-through;\n  font-size: 2rem;\n}", "",{"version":3,"sources":["webpack://./src/styles/main.scss"],"names":[],"mappings":"AAEA;EACC,mBAAA;EACA,+BAAA;EACA,cAAA;EACA,YAAA;EACA,WAAA;EACA,eAAA;AAAD;;AAGA;EACC,iBAAA;EACA,mBAAA;EACA,4BAAA;EACA,kCAAA;EACA,yBAAA;EACA,cAAA;AAAD;;AAGA;EACC,iBAAA;EACA,eAAA;EACA,SAAA;EACA,gCAAA;EACA,aAAA;EACA,8BAAA;AAAD;;AAGA;EACC,aAAA;EACA,8BAAA;EACA,gCAAA;EACA,mBAAA;EACA,mBAAA;EACA,qBAAA;AAAD;;AAGA;EACC,sBAAA;EACA,SAAA;EACA,oBAAA;EACA,iBAAA;EACA,kBAAA;EACA,mBAAA;EACA,YAAA;EACA,eAAA;EACA,iBAAA;EACA,YAAA;EACA,WAAA;AAAD;;AAGA;EACC,aAAA;AAAD;;AAGA;EACC,SAAA;EACA,UAAA;EACA,gBAAA;AAAD;;AAGA;EACC,eAAA;EACA,gCAAA;EACA,aAAA;EACA,8BAAA;AAAD;;AAGA;EACC,aAAA;EACA,WAAA;EACA,eAAA;AAAD;;AAGA;EACC,YAAA;EACA,WAAA;EACA,SAAA;AAAD;;AAGA;EACC,mBAAA;EACA,eAAA;EACA,aAAA;EACA,eAAA;EACA,uBAAA;AAAD;;AAGA;EACC,qBAAA;EACA,cAAA;EACA,iBAAA;EACA,WAAA;AAAD;;AAGA;EACC,YAAA;AAAD;;AAGA;EACC,YAAA;AAAD;;AAGA;EACE,uBAAA;EACA,eAAA;EACA,gCAAA;EACA,aAAA;EACA,8BAAA;AAAF;;AAGA;EACE,aAAA;EACA,WAAA;AAAF;;AAGA;EACE,YAAA;EACA,uBAAA;EACD,eAAA;AAAD;;AAGA;EACE,aAAA;AAAF;;AAGA;EACE,6BAAA;EACD,eAAA;AAAD","sourcesContent":["@import url(\"https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap\");\n\nbody {\n\tbackground: #1d0404;\n\tfont-family: Roboto, sans-serif;\n\tcolor: rgb(65, 15, 15);\n\theight: 100%;\n\twidth: 100%;\n\tfont-size: 1rem;\n}\n\nmain {\n\tmargin: 5rem 5rem;\n\tbackground: rgb(242, 235, 235);\n\tborder-radius: 20px 20px 0 0;\n\tbox-shadow: 10px 10px 20px #f6c5c5;\n\tborder: 1px solid #d5d5d5;\n\tcolor: rgb(36, 10, 10);\n}\n\nmain > h1 {\n\tfont-weight: bold;\n\tpadding: 1.5rem;\n\tmargin: 0;\n\tborder-bottom: 1px solid #d5d5d5;\n\tdisplay: flex;\n\tjustify-content: space-between;\n}\n\n#add-label {\n\tdisplay: flex;\n\tjustify-content: space-between;\n\tborder-bottom: 1px solid #d5d5d5;\n\talign-items: center;\n\tbackground: #856363;\n\tpadding-right: 1.5rem;\n}\n\n#add-todo {\n\tbox-sizing: border-box;\n\tmargin: 0;\n\tmargin-right: 1.5rem;\n\tfont-size: 1.5rem;\n\tfont-style: italic;\n\tbackground: #462222;\n\tcolor: white;\n\tpadding: 1.5rem;\n\tfont-size: 1.9rem;\n\tborder: none;\n\twidth: 100%;\n}\n\n#add-todo:focus {\n\toutline: none;\n}\n\nul {\n\tmargin: 0;\n\tpadding: 0;\n\tlist-style: none;\n}\n\nul > li {\n\tpadding: 1.5rem;\n\tborder-bottom: 1px solid #d5d5d5;\n\tdisplay: flex;\n\tjustify-content: space-between;\n}\n\nul > li > label {\n\tdisplay: flex;\n\tgap: 1.5rem;\n\tfont-size: 2rem;\n}\n\n.checkbox {\n\theight: 2rem;\n\twidth: 2rem;\n\tmargin: 0;\n}\n\nfooter {\n\tbackground: #462222;\n\tpadding: 1.5rem;\n\tdisplay: flex;\n\tfont-size: 2rem;\n\tjustify-content: center;\n}\n\nfooter > a {\n\ttext-decoration: none;\n\tcolor: rgb(242, 239, 237);\n\tfont-weight: bold;\n\tcolor: #888;\n}\n\n.header-icon {\n\theight: 2rem;\n}\n\n.icon {\n\theight: 1rem;\n}\n\n.edit-todo-form {\n  background: lightyellow;\n  padding: 1.5rem;\n  border-bottom: 1px solid #d5d5d5;\n  display: flex;\n  justify-content: space-between;\n}\n\n.edit-todo-form > label {\n  display: flex;\n  gap: 1.5rem;\n}\n\n.edit-todo-input {\n  border: none;\n  background: lightyellow;\n\tfont-size: 2rem;\n}\n\n.edit-todo-input:focus {\n  outline: none;\n}\n\n.completed {\n  text-decoration: line-through;\n\tfont-size: 2rem;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";

      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }

      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }

      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }

      content += cssWithMappingToString(item);

      if (needLayer) {
        content += "}";
      }

      if (item[2]) {
        content += "}";
      }

      if (item[4]) {
        content += "}";
      }

      return content;
    }).join("");
  }; // import a list of modules into the list


  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }

      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }

      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }

      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),

/***/ "./src/styles/main.scss":
/*!******************************!*\
  !*** ./src/styles/main.scss ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./main.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/styles/main.scss");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);

  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();

        stylesInDOM.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";

  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }

  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }

  var needLayer = typeof obj.layer !== "undefined";

  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }

  css += obj.css;

  if (needLayer) {
    css += "}";
  }

  if (obj.media) {
    css += "}";
  }

  if (obj.supports) {
    css += "}";
  }

  var sourceMap = obj.sourceMap;

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, styleElement, options.options);
}

function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }

  styleElement.parentNode.removeChild(styleElement);
}
/* istanbul ignore next  */


function domAPI(options) {
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}

module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ }),

/***/ "./src/enter.png":
/*!***********************!*\
  !*** ./src/enter.png ***!
  \***********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "enter.png";

/***/ }),

/***/ "./src/images/ellipsis-vertical.svg":
/*!******************************************!*\
  !*** ./src/images/ellipsis-vertical.svg ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "ellipsis-vertical.svg";

/***/ }),

/***/ "./src/images/trash-can.svg":
/*!**********************************!*\
  !*** ./src/images/trash-can.svg ***!
  \**********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "trash-can.svg";

/***/ }),

/***/ "./src/rotate.svg":
/*!************************!*\
  !*** ./src/rotate.svg ***!
  \************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "rotate.svg";

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_main_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles/main.scss */ "./src/styles/main.scss");
/* harmony import */ var _rotate_svg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./rotate.svg */ "./src/rotate.svg");
/* harmony import */ var _enter_png__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./enter.png */ "./src/enter.png");
/* harmony import */ var _modules_handleDOM_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/handleDOM.js */ "./src/modules/handleDOM.js");
/* harmony import */ var _modules_showTodo_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/showTodo.js */ "./src/modules/showTodo.js");
/* harmony import */ var _modules_data_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/data.js */ "./src/modules/data.js");
/* harmony import */ var _modules_newTodoForm_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/newTodoForm.js */ "./src/modules/newTodoForm.js");
/* harmony import */ var _modules_clearAllCompletedHandler_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./modules/clearAllCompletedHandler.js */ "./src/modules/clearAllCompletedHandler.js");
// Todo APP









var loadElements = function loadElements() {
  var todoArray = [];
  todoArray = (0,_modules_data_js__WEBPACK_IMPORTED_MODULE_5__.getData)();
  todoArray.sort(function (a, b) {
    return a.index - b.index;
  }).forEach(function (todo) {
    var todoElement = (0,_modules_showTodo_js__WEBPACK_IMPORTED_MODULE_4__["default"])(todo);
    (0,_modules_handleDOM_js__WEBPACK_IMPORTED_MODULE_3__.appendToDOM)(todoElement);
  });
};

var loadRefreshBtn = function loadRefreshBtn() {
  var refreshBtn = document.getElementById('refresh');
  refreshBtn.src = _rotate_svg__WEBPACK_IMPORTED_MODULE_1__;
  refreshBtn.alt = 'refresh';
  refreshBtn.setAttribute('class', 'header-icon');
};

var loadEnterBtn = function loadEnterBtn() {
  var enterBtn = document.getElementById('enter');
  enterBtn.src = _enter_png__WEBPACK_IMPORTED_MODULE_2__;
  enterBtn.alt = 'enter';
  enterBtn.setAttribute('class', 'icon');
};

var loadClearAllCompletedLink = function loadClearAllCompletedLink() {
  var footer = document.getElementsByTagName('footer')[0];
  var clearAllCompletedLink = document.createElement('a');
  clearAllCompletedLink.setAttribute('id', 'clear-all-completed');
  clearAllCompletedLink.setAttribute('href', '/');
  clearAllCompletedLink.innerText = 'Clear all completed';
  clearAllCompletedLink.addEventListener('click', _modules_clearAllCompletedHandler_js__WEBPACK_IMPORTED_MODULE_7__["default"]);
  footer.appendChild(clearAllCompletedLink);
};

window.onload = function () {
  loadElements();
  loadRefreshBtn();
  loadEnterBtn();
  loadClearAllCompletedLink();
  _modules_newTodoForm_js__WEBPACK_IMPORTED_MODULE_6__.newTodoForm.addEventListener('submit', _modules_newTodoForm_js__WEBPACK_IMPORTED_MODULE_6__.newTodoFormHandler);
};
})();

/******/ })()
;
//# sourceMappingURL=bundle2357be3fb34742c90a4a.js.map