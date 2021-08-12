"use strict";

var rootendpoint = 'https://api.learnjavascript.today';
var auth = {
  username: 'your-username',
  password: 'your-password'
};
/*zlFetch.post(`${rootendpoint}/users`, {
        body: {
            username: 'your-username',
            password: 'your-password'
        }
    })
    .then(response => console.log(response.body))
    .catch(error => console.log(error));*/

var todolist = document.querySelector('body .container .container__list');
var emptyStateDiv = todolist.querySelector('.todolist__empty-state');
var promises = zlFetch("".concat(rootendpoint, "/tasks"), {
  auth: auth
});
promises.then(function (response) {
  var tasks = response.body; //append tasks to DOM

  tasks.forEach(function (task) {
    var taskElement = makeTaskElement1(task);
    todolist.appendChild(taskElement);
  });
  var todolistbtn = document.querySelector('.container__btn');
  todolistbtn.addEventListener('submit', addtasktodom); //change empty state text

  emptyStateDiv.textContent = 'Your todo list is empty!  🎉';
})["catch"](function (error) {
  return console.error(error);
}); // .then(response => console.log(response.body))

function makeTaskElement(elem) {
  var li = document.createElement('li');
  li.innerHTML = "".concat(elem); // console.log(li);

  return li;
}

var makeTaskElement1 = function makeTaskElement1(_ref) {
  var id = _ref.id,
      name = _ref.name,
      done = _ref.done;
  var taskElement = document.createElement('li');
  taskElement.classList.add('task');
  taskElement.innerHTML = "\n    <input type=\"checkbox\" id=\"".concat(id, "/>\"\n    <label for=\"").concat(id, "\">...</label>\n    <span class=\"task__name\">").concat(name, "</span>\n    <button type=\"button\" class=\"task__delete-button\">\n    <svg viewBox=\"0 0 20 20\">... </svg>\n    </button>");
  return taskElement;
};

function addtasktodom(event) {
  event.preventDefault();
  var newTaskField = todolist.querySelector('input');
  var inputValue = DOMPurify.sanitize(newTaskField.value.trim());
  var id = generateUniqueString(10);
  /*   const taskElement = makeTaskElement(
         id,
         name: inputValue,
         done: false
     );*/

  zlFetch.post("".concat(rootendpoint, "/tasks"), {
    auth: auth,
    body: {
      // Information about the task
      name: DOMPurify.sanitize(inputValue)
    }
  }).then(function (response) {
    console.log(response.body);
  });
}