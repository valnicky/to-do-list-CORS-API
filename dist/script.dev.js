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
var taskName = todolist.querySelector('.task .task__name');
var deleteBtn = todolist.querySelector('.task__delete-button span');
todolistbtn.addEventListener('click', addtasktodom);
newTaskField.addEventListener('click', function () {
  newTaskField.value = '';
});
/*
function makeTaskElement1(elem) {
    const li = document.createElement('li');
    li.innerHTML = `${elem}`;
    // console.log(li);
    return li;
}*/

var makeTaskElement = function makeTaskElement(_ref) {
  var id = _ref.id,
      name = _ref.name,
      done = _ref.done;
  var taskElement = document.createElement('li');
  taskElement.classList.add('task');
  taskElement.innerHTML = "\n    <input type=\"checkbox\" id=\"".concat(id, "\" ").concat(done ? 'checked' : '', "/>\n    <label for=\"").concat(id, "\"></label>\n    <input class=\"task__name\" value=\"").concat(name, "\"/>\n    <button type=\"button\" class=\"task__delete-button\">\n    <span>&#10062;</span>\n    </button>");
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
    //console.log(response.body);
    //append task to DOM
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

promises.then(function (response) {
  //append tasks to DOM
  var tasks = response.body;
  tasks.forEach(function (task) {
    var taskElement = makeTaskElement(task);
    todolist.appendChild(taskElement);
  });

  if (todolist.querySelector('li').length == 0) {
    //change empty state text
    emptyStateDiv.textContent = 'Your todo list is empty!  🎉';
  }
})["catch"](function (error) {
  return console.error(error);
});
/*
todolist.addEventListener('change', event => {
    if (!event.target.matches('input[type="checkbox"]')) {
        return
    }
    const checkbox = event.target;
    const id = checkbox.id;
    const done = checkbox.checked;

    zlFetch.put(`${rootendpoint}/tasks/${id}`, {
            auth,
            body: {
                done
            }
        })
        .then(response => { // console.log(response.body)
        })
        .catch(error => console.error(error))
});*/

todolist.addEventListener('input', function (event) {
  var taskElement = event.target.parentElement;
  var checkbox = taskElement.querySelector('input[type="checkbox"]');
  var taskInput = taskElement.querySelector('.task__name');
  var id = checkbox.id;
  var done = checkbox.checked;
  var name = taskInput.value.trim();
  /*
      if (!event.target.matches('.task__name')) return;
      const input = event.target;
      const inputValue = (input.value.trim());*/
  //console.log(id);

  zlFetch.put("".concat(rootendpoint, "/tasks/").concat(id), {
    auth: auth,
    body: {
      name: name,
      done: done
    }
  }).then(function (response) {
    console.log(response.body);
  })["catch"](function (error) {
    return console.error(error);
  });
});

function debounce(callback, wait, immediate) {
  var timeout;
  return function () {
    var context = this;
    var args = arguments;

    var later = function later() {
      timeout = null;
      if (!immediate) callback.apply(context, args);
    };

    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) callback.apply(context, args);
  };
}

var debouncedFunction = debounce(function (event) {
  var taskElement = event.target.parentElement;
  var checkbox = taskElement.querySelector('input[type="checkbox"]');
  var taskInput = taskElement.querySelector('.task__name');
  var id = checkbox.id;
  var done = checkbox.checked;
  var name = taskInput.value.trim();
  zlFetch.put("".concat(rootendpoint, "/tasks/").concat(id), {
    auth: auth,
    body: {
      name: name,
      done: done
    }
  }).then(function (response) {//  console.log(response.body);
  })["catch"](function (error) {
    return console.error(error);
  });
}, 250);
todolist.addEventListener('input', debouncedFunction);
deleteBtn.addEventListener('click', function (event) {
  var target = event.target;
  console.log(target);
  zlFetch["delete"]("".concat(rootendpoint, "/tasks/").concat(id), {
    auth: auth
  }).then(function (response) {
    return console.log(response.body);
  })["catch"](function (error) {
    return console.error(error);
  });
});