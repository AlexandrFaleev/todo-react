import { Field } from '@components'
import { useContext } from 'react'
import { TodoContext } from '@/entitites/Todo/index.js'


export const SearchTaskForm = (props) => {
    const {className} = props
    const { searchQuery, setSearchQuery } = useContext(TodoContext)

    return (
        <form className={className} onSubmit={(e) => e.preventDefault()}>
            <Field
                id='searchTask'
                title={'Поиск задачи'}
                type='search'
                value={searchQuery}
                onInput={(evt) => setSearchQuery(evt.target.value)}
            />
        </form>
    )
}