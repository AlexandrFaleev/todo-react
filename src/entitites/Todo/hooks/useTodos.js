import {useCallback, useEffect, useMemo, useReducer, useRef, useState} from "react";
import tasksApi from "@/entitites/Todo/api/index.js";

const tasksReducer = (state, action) => {
    switch (action.type) {
        case 'SET_ALL': {
            return Array.isArray(action.tasks) ? action.tasks : state
        }
        case 'ADD': {
            return [...state, action.task]
        }
        case 'TOGGLE_COMPLETE': {
            const { id, completed } = action

            return state.map((task) => {
                return task.id === id ? { ...task, completed } : task
            })
        }
        case 'DELETE': {
            return state.filter((task) => task.id !== action.id)
        }
        case 'DELETE_ALL': {
            return []
        }
        default: {
            return state
        }
    }
}

const useTodos = () => {
    const [todos, dispatch] = useReducer(tasksReducer, [])
    const [searchQuery, setSearchQuery] = useState('')
    const newTaskInputRef = useRef(null)

    const deleteAllTasks = useCallback(() => {
        const isConfirmed = confirm('Вы уверены, что хотите удалить все задачи')

        if(isConfirmed) {
            tasksApi.deleteAll(todos)
                .then(() => dispatch({type: 'DELETE_ALL', }))
        }
    }, [todos])

    const deleteTask = useCallback((taskId) => {
        tasksApi.delete(taskId)
        .then(() => {
            dispatch({type: 'DELETE', id: taskId})
        })
    },[])

    const toggleTaskCompete = useCallback((taskId, isCompleted) => {
        tasksApi.toggleComplete(taskId, isCompleted)
            .then(() => {
                dispatch({type: 'TOGGLE_COMPLETE', id: taskId, completed: isCompleted})
            })
    }, [])

    const addTask = useCallback((title) => {
        const newTask = {
            title,
            completed: false
        }

        tasksApi.add(newTask)
        .then((addedTask) => {
            dispatch({type: 'ADD', task: addedTask})
            newTaskInputRef.current.focus()
        })
    }, [])

    useEffect(() => {
        newTaskInputRef.current.focus()

        tasksApi.getAll().then(serverTasks => {
            dispatch({type: 'SET_ALL', tasks: serverTasks})
        })
    }, [])

    const filteredTasks = useMemo(() => {
        const clearSearchQuery = searchQuery.trim().toLowerCase()

        return clearSearchQuery.length > 0
            ? todos.filter(({title}) => title.toLowerCase().includes(clearSearchQuery))
            : null
    }, [searchQuery, todos])

    return {
        todos,
        filteredTasks,
        deleteTask,
        deleteAllTasks,
        toggleTaskCompete,
        searchQuery,
        setSearchQuery,
        newTaskInputRef,
        addTask
    }
}

export default useTodos