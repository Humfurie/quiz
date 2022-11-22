export const MyButton = (props: any) => {
    const { type, className, onClick, label } = props
    return (
        <button
            type={type}
            className={className}
            onClick={onClick}
        >{label}</button>
    )
}