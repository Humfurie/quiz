export const MyInput = ({type, className, onChange, value, newKey, checked, defaultChecked, name }: any) => {
    return(
        <input 
        key={newKey}
        id={newKey}
        type={type}
        name={name}
        className={className}
        value={value}
        onChange={onChange}
        checked={checked}
        defaultChecked={defaultChecked}
         />
    )
}