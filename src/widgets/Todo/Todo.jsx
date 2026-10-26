import { TodoList } from '@/entitites/Todo'
import { AddTaskForm, SearchTaskForm, TodoInfo } from '@features'
import styles from './Todo.module.scss'

export const Todo = () => {

    return (
        <div className={styles.todo}>
            <h1 className={styles.todo__title}>To Do List</h1>
            <AddTaskForm className={styles.todo__form} />
            <SearchTaskForm className={styles.todo__form} />
            <TodoInfo styles={styles} />
            <TodoList styles={styles} />
        </div>
    )
}