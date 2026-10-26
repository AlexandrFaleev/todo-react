import {createContext} from "react";
import useTodos from "@/entitites/Todo/hooks/useTodos.js";

const TodoContext = createContext({})

export const TodoProvider = ({ children }) => {


    return (
        <TodoContext.Provider
            value={useTodos()}
        >
            {children}
        </TodoContext.Provider>
    )
}

export default TodoContext