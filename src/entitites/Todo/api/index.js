import todosServer from './serverApi.js'
import todosLocal from './localApi.js'

const isLocal = import.meta.env.VITE_STATIC_BACKEND === 'true'

const tasksApi = isLocal ? todosLocal : todosServer

export default tasksApi