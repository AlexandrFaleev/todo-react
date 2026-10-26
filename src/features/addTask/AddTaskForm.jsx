import {Button, Field} from "@components";
import {useContext, useState} from "react";
import {TodoContext} from "@/entitites/Todo/index.js";


export const AddTaskForm = (props) => {
    const { className } = props;
    const {
        addTask,
        newTaskInputRef
    } = useContext(TodoContext);

    const [newTaskTitle, setNewTaskTitle] = useState("")

    const onInput = (evt) => {
        const { value } = evt.target
        setNewTaskTitle(value)
    }

    const clearNewTaskTitle = newTaskTitle.trim()
    const isNewTaskTitleEmpty = clearNewTaskTitle.length === 0

    const onSubmit = (e) => {
        e.preventDefault()

        if(!isNewTaskTitleEmpty) {
            addTask(clearNewTaskTitle)
            setNewTaskTitle('')
        }
    }

    return (
        <form className={className} onSubmit={onSubmit}>
            <Field
                id='taskName'
                title={"Название задачи"}
                value={newTaskTitle}
                onInput={onInput}
                ref={newTaskInputRef}
            />
            <Button type="submit" disabled={newTaskTitle.trim().length === 0}>
                Добавить
            </Button>
        </form>
    )
}