const config = {
    baseUrl: 'http://localhost:3001/todos',
    headers: {
        'Content-Type': 'application/json',
    }
}

const getRespData = (res) => {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
}

export const TodoApi = {
    getTodos: () => {
        return fetch(`${config.baseUrl}`)
            .then(getRespData)
    },

    addTodo: (data) => {
        return fetch(`${config.baseUrl}`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: config.headers
        }).then(getRespData)
    },

    deleteTodo: (id) => {
        return fetch(`${config.baseUrl}/${id}`, {
            method: 'DELETE',
            headers: config.headers
        }).then(getRespData)
    },

    changeStatus: (id, completed) => {
        return fetch(`${config.baseUrl}/${id}`, {
            method: 'PATCH',
            body: JSON.stringify({completed}),
            headers: config.headers
        }).then(getRespData)
    },

    removeAll: (tasks) => {
        return Promise.all(tasks.map((task) => {
            return fetch(`${config.baseUrl}/${task.id}`, {
                method: 'DELETE',
                headers: config.headers
            }).then(getRespData)
        }))
    }
}