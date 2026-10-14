import { Field } from '@components'
import { useContext } from 'react'
import { TodoContext } from '@/entitites/Todo/index.js'


export const SearchTaskForm = (props) => {
    const {className} = props
    const { search, setSearch } = useContext(TodoContext)

    const onSearch = ({target}) => {
        setSearch(target.value)
    }

    return (
        <form className={className} onSubmit={(e) => e.preventDefault()}>
            <Field
                id='searchTask'
                title={'Поиск задачи'}
                type='search'
                value={search}
                onInput={onSearch}
            />
        </form>
    )
}