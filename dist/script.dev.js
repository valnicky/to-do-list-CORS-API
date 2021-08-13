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
var todolistbtn = document.querySelector('.container__btn');
todolistbtn.addEventListener('submit', addtasktodom); // .then(response => console.log(response.body))

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
  taskElement.innerHTML = "\n    <input type=\"checkbox\" id=\"".concat(id, "\"/>\n    <label for=\"").concat(id, "\">...</label>\n    <span class=\"task__name\">").concat(name, "</span>\n    <button type=\"button\" class=\"task__delete-button\">\n    <svg viewBox=\"0 0 20 20\">... </svg>\n    </button>");
  return taskElement;
};

function addtasktodom(event) {
  event.preventDefault(); //get value of task

  var newTaskField = todolist.querySelector('input');
  var inputValue = newTaskField.value.trim();
  console.log("input value " + inputValue);
  var id = generateUniqueString(10);
  var taskElement = makeTaskElement1({
    id: id,
    name: inputValue,
    done: false
  }); //prevent adding of empty task

  if (!inputValue) return; //give indication that we're adding a task

  todolistbtn.textContent = 'Adding task...'; //sends POST request...

  zlFetch.post("".concat(rootendpoint, "/tasks"), {
    auth: auth,
    body: {
      // Information about the task
      name: DOMPurify.sanitize(inputValue)
    }
  }).then(function (response) {
    console.log(response.body); //append task to DOM

    var tasks = response.body; //append tasks to DOM

    tasks.forEach(function (task) {
      var taskElement = makeTaskElement1(task);
      todolist.appendChild(taskElement);
    });
  })["catch"](function (error) {
    return console.error(error);
  })["finally"](function (_) {
    //change button text back to original text 
    todolistbtn.textContent = 'Add task';
  });
  promises.then(function (response) {
    //append task to DOM
    var task = response.body;
    var taskElement = makeTaskElement1(task);
    todolist.appendChild(taskElement); //clear the new task field

    newTaskField.value = ''; //bring focus back to input field

    newTaskField.focus(); //change empty state text

    emptyStateDiv.textContent = 'Your todo list is empty!  🎉';
  })["catch"](function (error) {
    return console.error(error);
  });
}