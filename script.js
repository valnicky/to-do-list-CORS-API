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

const promises = zlFetch(`${rootendpoint}/tasks`, { auth });

promises.then(response => {
        const tasks = response.body;
        tasks.forEach(task => {
            const taskElement = makeTaskElement1(task);
            const contenedor = document.querySelector('body .container .container__list');
            contenedor.appendChild(taskElement);

        })
    })
    .catch(error => console.error(error));

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
    taskElement.innerHTML = DOMPurify.sanitize(`
    <input type="checkbox" id="${id}/>"
    <label for="${id}">...</label>
    <span class="tasl__name">${name}</span>
    <button type="button" class="task__delete-button">
    <svg viewBox="0 0 20 20">... </svg>
    </button>`);
    return taskElement;
}