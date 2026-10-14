import {createContext, useEffect, useMemo, useRef, useState} from "react";
import {TodoApi} from "@/entitites/Todo/index.js";

const TodoContext = createContext({})

export const TodoProvider = ({ children }) => {
    const [todos, setTodos] = useState([])
    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [search, setSearch] = useState('')

    const [isLoading, setIsLoading] = useState(true)

    const newTaskInput = useRef(null)
    const firstIncompleteTaskRef = useRef(null)

    const filteredTodos = useMemo(() => {
        const formattedSearch = search.trim().toLowerCase()
        return formattedSearch.length > 0
            ? todos.filter(({title}) => title.toLowerCase().includes(formattedSearch))
                : null
    }, [todos, search])
    const total = useMemo(() => {
        return todos.length
    }, [todos])
    const doneTotal = useMemo(() => {
        return todos.filter(({completed}) => completed).length
    }, [todos])
    const firstIncompleteTaskId = useMemo(() => {
        return todos.find(({completed}) => !completed)?.id
    }, [todos])

    const onNewTaskInputChange = (e) => {
        setNewTaskTitle(e.target.value)
    }
    const onAddTaskSubmit = (e) => {
        e.preventDefault()

        const formattedTitle = newTaskTitle.trim()

        if(formattedTitle.length > 0) {
            TodoApi.addTodo({
                title: formattedTitle,
                completed: false,
            }).then((data) => {
                setTodos((prevTodos) => [...prevTodos, data])
            }).catch((err) => {
                console.log(err)
            }).finally(() => setNewTaskTitle(''))
        }
    }
    const deleteTodo = (taskId) => {
        TodoApi.deleteTodo(taskId)
            .then((data) => {
                setTodos((prevTodos) => {
                   return prevTodos.filter(({id}) => id !== data.id)
                })
            })
    }
    const toggleTodo = (id, completed) => {
        TodoApi.changeStatus(id, completed)
            .then((data) => {
                setTodos((prevTodos) => {
                    return prevTodos.map((task) => {
                        if(task.id === data.id) {
                           return {...task, completed: data.completed}
                        }

                        return task
                    })
                })
            })
    }
    const onDeleteAll = async () => {
        if(confirm('Вы уверены что хотите удалить все задачи?')) {
            await TodoApi.removeAll(todos)
                .then(() => {
                    setTodos([])
                    setNewTaskTitle('')
                    setSearch('')
                    newTaskInput.current?.focus()
                })
        }
    }
    const onFirstIncompleteScroll = () => {
        firstIncompleteTaskRef.current
            ?.scrollIntoView({behavior: 'smooth'})
    }

    useEffect(() => {
        newTaskInput.current?.focus()
        TodoApi.getTodos()
            .then(setTodos)
            .catch((err) => {
                console.log(err)
                setTodos([])
            })
            .finally(() => setIsLoading(false))
    }, [])

    return (
        <TodoContext.Provider
            value={{
                todos,
                isLoading,
                filteredTodos,
                total,
                doneTotal,
                firstIncompleteTaskId,
                firstIncompleteTaskRef,
                newTaskTitle,
                search,
                newTaskInput,
                setSearch,
                onNewTaskInputChange,
                onAddTaskSubmit,
                deleteTodo,
                toggleTodo,
                onDeleteAll,
                onFirstIncompleteScroll
            }}
        >
            {children}
        </TodoContext.Provider>
    )
}

export default TodoContext