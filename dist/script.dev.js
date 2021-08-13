"use strict";

var rootendpoint = 'https://api.learnjavascript.today';
var auth = {
  username: 'valery',
  password: 'v123456'
};
/*
zlFetch.post(`${rootendpoint}/users`, {
        body: {
            username: 'valery',
            password: 'v123456'
        }
    })
    .then(response => console.log(response.body))
    .catch(error => console.log(error));
id: "61165e4fed641c01ca771381"
*/

var todolist = document.querySelector('body .container .container__list');
var emptyStateDiv = todolist.querySelector('.todolist__empty-state');
var promises = zlFetch("".concat(rootendpoint, "/tasks"), {
  auth: auth
});
var todolistbtn = document.querySelector('.container__btn');
var newTaskField = document.querySelector('body .container .container__addtask .container__task .container__eg');
todolistbtn.addEventListener('click', addtasktodom);
newTaskField.addEventListener('click', function () {
  newTaskField.value = '';
});

function makeTaskElement1(elem) {
  var li = document.createElement('li');
  li.innerHTML = "".concat(elem); // console.log(li);

  return li;
}

var makeTaskElement = function makeTaskElement(_ref) {
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

  var inputValue = newTaskField.value.trim();
  /*const id = generateUniqueString(10);
  const taskElement = makeTaskElement({
      id,
      name: inputValue,
      done: false
  });*/
  //prevent adding of empty task

  if (!inputValue) return; //disable btn

  todolistbtn.setAttribute('disabled', true); //give indication that we're adding a task

  todolistbtn.textContent = 'Adding task...'; //sends POST request...

  zlFetch.post("".concat(rootendpoint, "/tasks"), {
    auth: auth,
    body: {
      // Information about the task
      name: inputValue //DOMPurify.sanitize(

    }
  }).then(function (response) {
    console.log(response.body); //append task to DOM

    var task = response.body; //append tasks to DOM

    var taskElement = makeTaskElement(task);
    todolist.appendChild(taskElement); //clear the new task field

    newTaskField.value = ''; //bring focus back to input field

    newTaskField.focus();
  })["catch"](function (error) {
    return console.error(error);
  })["finally"](function (_) {
    //enables btn 
    todolistbtn.removeAttribute('disabled'); //change button text back to original text 

    todolistbtn.textContent = 'Add task';
  });
}
/*
promises.then(response => {
        //append tasks to DOM
        const tasks = response.body;
        tasks.forEach(task => {
            const taskElement = makeTaskElement(task);
            todolist.appendChild(taskElement);
        })


        //change empty state text
        emptyStateDiv.textContent = 'Your todo list is empty!  🎉'
    })
    .catch(error => console.error(error));*/