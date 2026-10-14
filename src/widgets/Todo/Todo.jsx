import { TodoContext, TodoList } from '@/entitites/Todo'
import { AddTaskForm, SearchTaskForm, TodoInfo } from '@features'
import { Button } from '@components'
import { useContext } from 'react'
import styles from './Todo.module.scss'

export const Todo = () => {
    const { total, onFirstIncompleteScroll } = useContext(TodoContext)

    return (
        <div className={styles.todo}>
            <h1 className={styles.todo__title}>To Do List</h1>
            <AddTaskForm className={styles.todo__form} />
            <SearchTaskForm className={styles.todo__form} />
            <TodoInfo styles={styles} />
            <Button
                type="button"
                disabled={total === 0}
                onClick={onFirstIncompleteScroll}
            >
                Перейти к первой незавершенной
            </Button>
            <TodoList styles={styles} />
        </div>
    )
}