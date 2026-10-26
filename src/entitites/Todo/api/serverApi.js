const apiConfig = {
    baseUrl: "http://localhost:3001/todos",
    headers: {
        "Content-Type": "application/json",
    }
}

const todosServer = {
    getAll: () => {
      return fetch(apiConfig.baseUrl)
          .then(res => res.json())
    },

    add: ( todo ) => {
        return fetch(apiConfig.baseUrl, {
            method: "POST",
            headers: apiConfig.headers,
            body: JSON.stringify(todo)
        })
        .then(res => res.json())
    },

    delete: ( id ) => {
        return fetch(`${apiConfig.baseUrl}/${id}`, {
            method: "DELETE"
        })
    },

    deleteAll: ( todos ) => {
        return Promise.all(
            todos.map(({id}) => todosServer.delete(id))
        )
    },

    toggleComplete: (id, completed) => {
        return fetch(`${apiConfig.baseUrl}/${id}`, {
            method: "PATCH",
            headers: apiConfig.headers,
            body: JSON.stringify({ completed })
        })
    }
}

export default todosServer