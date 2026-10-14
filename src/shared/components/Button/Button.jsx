import s from './Button.module.scss'

export const Button = (props) => {
    const {
        type="button",
        children,
        disabled=false,
        onClick
    } = props

    return (
        <button
            className={s.button}
            type={type}
            disabled={disabled}
            onClick={onClick}
        >
            {children}
        </button>
    )
}