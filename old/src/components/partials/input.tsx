export const MyInput = ({type, className, onChange, value, questionKey, checked, defaultChecked }: any) => {
    return(
        <input 
        key={questionKey}
        id={questionKey}
        type={type}
        className={className}
        value={value}
        onChange={onChange}
        checked={checked}
        defaultChecked={defaultChecked}
         />
    )
}