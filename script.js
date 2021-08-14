const rootendpoint = 'https://api.learnjavascript.today'

const auth = {
        username: 'valery',
        password: 'v123456'
    }
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
const todolist = document.querySelector('body .container .container__list');
const emptyStateDiv = todolist.querySelector('.todolist__empty-state');
const promises = zlFetch(`${rootendpoint}/tasks`, { auth });
const todolistbtn = document.querySelector('.container__btn');
const newTaskField = document.querySelector('body .container .container__addtask .container__task .container__eg');
const taskName = todolist.querySelector('.task .task__name');
const deleteBtn = todolist.querySelector('.task__delete-button span');

todolistbtn.addEventListener('click', addtasktodom);
newTaskField.addEventListener('click', () => {
    newTaskField.value = '';
});
/*
function makeTaskElement1(elem) {
    const li = document.createElement('li');
    li.innerHTML = `${elem}`;
    // console.log(li);
    return li;
}*/

const makeTaskElement = ({ id, name, done }) => {
    const taskElement = document.createElement('li');
    taskElement.classList.add('task');
    taskElement.innerHTML = (`
    <input type="checkbox" id="${id}" ${done? 'checked' : ''}/>
    <label for="${id}"></label>
    <input class="task__name" value="${name}"/>
    <button type="button" class="task__delete-button">
    <span>&#10062;</span>
    </button>`);
    return taskElement;
}

function addtasktodom(event) {
    event.preventDefault()

    //get value of task
    const inputValue = newTaskField.value.trim();

    /*const id = generateUniqueString(10);
    const taskElement = makeTaskElement({
        id,
        name: inputValue,
        done: false
    });*/

    //prevent adding of empty task
    if (!inputValue) return;

    //disable btn
    todolistbtn.setAttribute('disabled', true);
    //give indication that we're adding a task
    todolistbtn.textContent = 'Adding task...';

    //sends POST request...
    zlFetch.post(`${rootendpoint}/tasks`, {
            auth,
            body: {
                // Information about the task
                name: inputValue
                    //DOMPurify.sanitize(
            }
        }).then(response => {
            //console.log(response.body);
            //append task to DOM
            const task = response.body;
            //append tasks to DOM
            const taskElement = makeTaskElement(task);
            todolist.appendChild(taskElement);

            //clear the new task field
            newTaskField.value = '';

            //bring focus back to input field
            newTaskField.focus();
        })
        .catch(error => console.error(error))
        .finally(_ => {
            //enables btn 
            todolistbtn.removeAttribute('disabled');
            //change button text back to original text 
            todolistbtn.textContent = 'Add task';
        })
}

promises.then(response => {
        //append tasks to DOM
        const tasks = response.body;
        tasks.forEach(task => {
            const taskElement = makeTaskElement(task);
            todolist.appendChild(taskElement);
        })

        if (todolist.querySelector('li').length == 0) {
            //change empty state text
            emptyStateDiv.textContent = 'Your todo list is empty!  🎉'
        }
    })
    .catch(error => console.error(error));
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

todolist.addEventListener('input', event => {
    const taskElement = event.target.parentElement;
    const checkbox = taskElement.querySelector('input[type="checkbox"]');
    const taskInput = taskElement.querySelector('.task__name');

    const id = checkbox.id;
    const done = checkbox.checked;

    const name = taskInput.value.trim();
    /*
        if (!event.target.matches('.task__name')) return;
        const input = event.target;
        const inputValue = (input.value.trim());*/

    //console.log(id);

    zlFetch.put(`${rootendpoint}/tasks/${id}`, {
            auth,
            body: {
                name,
                done
            }
        })
        .then(response => {
            console.log(response.body);
        })
        .catch(error => console.error(error));
});

function debounce(callback, wait, immediate) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) callback.apply(context, args)
        }
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) callback.apply(context, args);
    }
}

const debouncedFunction = debounce(event => {
    const taskElement = event.target.parentElement;
    const checkbox = taskElement.querySelector('input[type="checkbox"]');
    const taskInput = taskElement.querySelector('.task__name');

    const id = checkbox.id;
    const done = checkbox.checked;

    const name = taskInput.value.trim();

    zlFetch.put(`${rootendpoint}/tasks/${id}`, {
            auth,
            body: {
                name,
                done
            }
        })
        .then(response => {
            //  console.log(response.body);
        })
        .catch(error => console.error(error));

}, 250);

todolist.addEventListener('input', debouncedFunction);

deleteBtn.addEventListener('click', event => {
    const target = event.target;
    console.log(target);

    zlFetch.delete(`${rootendpoint}/tasks/${id}`, { auth })
        .then(response => console.log(response.body))
        .catch(error => console.error(error))
});