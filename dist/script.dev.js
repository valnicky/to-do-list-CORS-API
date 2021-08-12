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

var promises = zlFetch("".concat(rootendpoint, "/tasks"), {
  auth: auth
});
promises.then(function (response) {
  var tasks = response.body;
  tasks.forEach(function (task) {
    var taskElement = makeTaskElement1(task);
    var contenedor = document.querySelector('body .container .container__list');
    contenedor.appendChild(taskElement);
  });
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
  taskElement.innerHTML = DOMPurify.sanitize("\n    <input type=\"checkbox\" id=\"".concat(id, "/>\"\n    <label for=\"").concat(id, "\">...</label>\n    <span class=\"tasl__name\">").concat(name, "</span>\n    <button type=\"button\" class=\"task__delete-button\">\n    <svg viewBox=\"0 0 20 20\">... </svg>\n    </button>"));
  return taskElement;
};