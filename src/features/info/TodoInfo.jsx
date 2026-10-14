import { useContext } from 'react'
import { TodoContext } from '@/entitites/Todo/index.js'


export const TodoInfo = (props) => {
    const { styles } = props
    const { total, doneTotal, onDeleteAll } = useContext(TodoContext)

    return (
        <div className={styles.todo__info}>
            <h2 className={styles[`todo__info-total`]}>
                Выполнено {doneTotal} из {total}
            </h2>
            {total > 0 && (
                <button
                    className={styles[`todo__info-delete_all`]}
                    type="button"
                    onClick={onDeleteAll}
                >
                    Удалить все
                </button>
            )}
        </div>
    )
}