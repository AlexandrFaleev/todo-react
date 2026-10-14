import {useContext} from "react";
import {TodoContext, TodoItem} from "@/entitites/Todo/index.js";

export const TodoList = (props) => {
    const { styles } = props;
    const {
        todos,
        filteredTodos,
        firstIncompleteTaskId,
        firstIncompleteTaskRef,
        isLoading,
    } = useContext(TodoContext);

    if(isLoading) {
        return (
            <div className={styles.loader}></div>
        )
    }

    if (todos.length === 0) {
        return (
            <div className={styles.todo__empty}>
                У вас пока нет задач
            </div>
        )
    }

    if (filteredTodos?.length === 0) {
        return (
            <div className={styles.todo__empty}>
                Задача не найдена
            </div>
        )
    }

    return (
        <ul className={styles.todo__list}>
            {(filteredTodos ?? todos).map((task, index) => (
                <TodoItem
                    key={index}
                    task={task}
                    styles={styles}
                    ref={firstIncompleteTaskId === task.id ? firstIncompleteTaskRef : null}
                />
            ))}
        </ul>
    )
}