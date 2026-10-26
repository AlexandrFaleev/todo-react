const STORAGE_KEY = 'todos'

const read = () => {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    } catch (error) {
        return []
    }
}

const write = (todos) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
}

const delay = (ms = 150) => {
    return new Promise(resolve => setTimeout(resolve, ms))
}

const todosLocal = {
    getAll: async () => {
        await delay()
        return read()
    },

    add: async ( task ) => {
        await delay()

        const newTask = {
            ...task,
            id: crypto?.randomUUID() ?? Date.now().toString(),
        }

        write([...read(), newTask])

        return newTask
    },

    delete: async ( id ) => {
        await delay()

        const tasks = read().filter((task) => task.id !== id)

        write(tasks)
    },

    deleteAll: async ( todos ) => {
        await delay()
        write([])
    },

    toggleComplete: async (id, completed) => {
        await delay()

        const tasks = read()
            .map((task) => {
                return task.id === id ? {...task, completed } : task
            })

        write(tasks)
    }
}

export default todosLocal