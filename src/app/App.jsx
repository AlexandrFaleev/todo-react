import { Todo } from '@widgets'
import {TodoProvider} from "@/entitites/Todo/index.js";

function App() {
  return (
    <TodoProvider>
      <Todo />
    </TodoProvider>
  )
}

export default App
