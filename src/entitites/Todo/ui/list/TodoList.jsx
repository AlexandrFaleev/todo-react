import {useContext} from "react";
import {TodoContext, TodoItem} from "@/entitites/Todo/index.js";

export const TodoList = (props) => {
    const { styles } = props;
    const {
        todos,
        filteredTasks
    } = useContext(TodoContext)

    const hasTasks = todos.length > 0
    const isEmptyFilteredTasks = filteredTasks?.length === 0

    if(!hasTasks) {
        return <div className={styles.todo__empty}>У вас пока нет задач</div>
    }

    if(hasTasks && isEmptyFilteredTasks) {
        return <div className={styles.todo__empty}>Задача не найдена</div>
    }

    return (
        <ul className={styles.todo__list}>
            {(filteredTasks ?? todos).map((task, index) => (
                <TodoItem
                    key={index}
                    task={task}
                    styles={styles}
                />
            ))}
        </ul>
    )
}