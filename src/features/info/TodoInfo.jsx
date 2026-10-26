import {memo, useContext, useMemo} from 'react'
import { TodoContext } from '@/entitites/Todo/index.js'


const TodoInfo = (props) => {
    const { styles } = props
    const { todos, deleteAllTasks } = useContext(TodoContext)

    const total = todos.length
    const hasTodos = total > 0
    const done = useMemo(() => {
        return todos.filter(({completed}) => completed).length
    }, [todos])

    return (
        <div className={styles.todo__info}>
            <h2 className={styles[`todo__info-total`]}>
                Выполнено {done} из {total}
            </h2>
            {hasTodos && (
                <button
                    className={styles[`todo__info-delete_all`]}
                    type="button"
                    onClick={deleteAllTasks}
                >
                    Удалить все
                </button>
            )}
        </div>
    )
}

export default memo(TodoInfo)