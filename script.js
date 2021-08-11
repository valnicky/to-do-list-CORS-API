const rootendpoint = 'https://api.learnjavascript.today'

const auth = {
    username: 'your-username',
    password: 'your-password'
}

zlFetch.post(`${rootendpoint}/users`, {
        body: {
            username: 'your-username',
            password: 'your-password'
        }
    })
    .then(response => console.log(response.body))
    .catch(error => console.log(error));

zlFetch(`${rootendpoint}/tasks`, { auth })
    .then(response => console.log(response.body))
    .catch(error => console.error(error));