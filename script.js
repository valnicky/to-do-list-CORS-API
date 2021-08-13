const rootendpoint = 'https://api.learnjavascript.today'

const auth = {
    username: 'your-username',
    password: 'your-password'
}

/*zlFetch.post(`${rootendpoint}/users`, {
        body: {
            username: 'your-username',
            password: 'your-password'
        }
    })
    .then(response => console.log(response.body))
    .catch(error => console.log(error));*/
const todolist = document.querySelector('body .container .container__list');
const emptyStateDiv = todolist.querySelector('.todolist__empty-state');
const promises = zlFetch(`${rootendpoint}/tasks`, { auth });
const todolistbtn = document.querySelector('.container__btn');

todolistbtn.addEventListener('submit', addtasktodom);


// .then(response => console.log(response.body))

function makeTaskElement(elem) {
    const li = document.createElement('li');
    li.innerHTML = `${elem}`;
    // console.log(li);
    return li;
}

const makeTaskElement1 = ({ id, name, done }) => {
    const taskElement = document.createElement('li');
    taskElement.classList.add('task');
    taskElement.innerHTML = (`
    <input type="checkbox" id="${id}"/>
    <label for="${id}">...</label>
    <span class="task__name">${name}</span>
    <button type="button" class="task__delete-button">
    <svg viewBox="0 0 20 20">... </svg>
    </button>`);
    return taskElement;
}

function addtasktodom(event) {
    event.preventDefault()

    //get value of task
    const newTaskField = todolist.querySelector('input');
    const inputValue = newTaskField.value.trim();
    console.log("input value " + inputValue);

    const id = generateUniqueString(10);
    const taskElement = makeTaskElement1({
        id,
        name: inputValue,
        done: false
    });

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
                name: DOMPurify.sanitize(inputValue)
            }
        }).then(response => {
            console.log(response.body);
            //append task to DOM
            const tasks = response.body;
            //append tasks to DOM
            tasks.forEach(task => {
                const taskElement = makeTaskElement1(task);

                todolist.appendChild(taskElement);
            })
        })
        .catch(error => console.error(error))
        .finally(_ => {
            //enables btn 
            todolistbtn.removeAttribute(''disabled);
            //change button text back to original text 
            todolistbtn.textContent = 'Add task';
        })

    promises.then(response => {
            //append task to DOM
            const task = response.body;
            const taskElement = makeTaskElement1(task);
            todolist.appendChild(taskElement);

            //clear the new task field
            newTaskField.value = '';

            //bring focus back to input field
            newTaskField.focus();
            //change empty state text
            emptyStateDiv.textContent = 'Your todo list is empty!  🎉'
        })
        .catch(error => console.error(error));
}