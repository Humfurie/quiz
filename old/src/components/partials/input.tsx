export const Input = ({type, className, onChange, value }: any) => {
    return(
        <input 
        type={type}
        className={className}
        value={value}
        onChange={onChange}
         />
    )
}