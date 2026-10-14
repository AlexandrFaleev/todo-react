import CrossIcon from '@assets/icons/icon-delete.svg?react'
import {useContext} from 'react'
import {TodoContext} from '@/entitites/Todo/index.js'

export const TodoItem = (props) => {
    const { task, styles, ref } = props
    const { deleteTodo, toggleTodo } = useContext(TodoContext)

    const onDeleteTodo = () => {
        deleteTodo(task.id)
    }
    const onCheckboxChange = () => {
        toggleTodo(task.id, !task.completed)
    }

    return (
        <li className={styles.todo__item} ref={ref}>
            <input
                id={task.id}
                className={styles[`todo__item-checkbox`]}
                type="checkbox"
                checked={task.completed}
                onChange={onCheckboxChange}
            />
            <label
                htmlFor={task.id}
                className={styles[`todo__item-title`]}
            >
                {task.title}
            </label>
            <button
                type="button"
                className={styles[`todo__item-button`]}
                onClick={onDeleteTodo}
            >
                <CrossIcon />
            </button>
        </li>
    )
}