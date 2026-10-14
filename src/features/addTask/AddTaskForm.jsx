import {Button, Field} from "@components";
import {useContext} from "react";
import {TodoContext} from "@/entitites/Todo/index.js";


export const AddTaskForm = (props) => {
    const { className } = props;
    const {
        newTaskTitle,
        onNewTaskInputChange,
        onAddTaskSubmit,
        newTaskInput
    } = useContext(TodoContext);

    return (
        <form className={className} onSubmit={onAddTaskSubmit}>
            <Field
                id='taskName'
                title={"Название задачи"}
                value={newTaskTitle}
                onInput={onNewTaskInputChange}
                ref={newTaskInput}
            />
            <Button type="submit" disabled={newTaskTitle.trim().length === 0}>
                Добавить
            </Button>
        </form>
    )
}