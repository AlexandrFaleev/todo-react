import s from './Field.module.scss'

export const Field = (props) => {
    const {
        id,
        title,
        type="text",
        value,
        onInput,
        ref
    } = props

    return (
        <div className={s.field}>
            <label htmlFor={id} className={s.field__label}>
                {title}
            </label>
            <input
                id={id}
                className={s.field__input}
                type={type}
                placeholder=" "
                autoComplete="off"
                value={value}
                onInput={onInput}
                ref={ref}
            />
        </div>
    )
}