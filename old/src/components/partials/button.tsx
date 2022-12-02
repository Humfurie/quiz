export const MyButton = (props: any) => {
    const { type, className, onClick, label , choiceKey } = props
    return (
        <div key={choiceKey}>
            <button
            id={choiceKey}
                type={type}
                className={className}
                onClick={onClick}
            >{label}</button>
        </div>
    )
}