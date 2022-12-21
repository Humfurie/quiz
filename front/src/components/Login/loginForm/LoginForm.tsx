import { useContext } from "react"
import { FormContext } from "../../../lib/useContext/formContext"
import { styles } from "../../../styles/style"
import { MyButton } from "../../../lib/partials/MyButton"
import { MyInput } from "../../../lib/partials/MyInput"

export const LoginForm = () => {
const { loginOnSubmit, loginOnchange} = useContext(FormContext)

    return (
        <div className={styles.Login.forminDiv}>
<form onSubmit={e => {
          e.preventDefault()
          loginOnSubmit()
        }}
        className={styles.Login.form}
        >
          <div className={styles.Login.formDiv}>
            <label htmlFor="email" className={styles.Login.formLabel}>Email</label>
            <MyInput type='text' onChange={(e:any) => {
              loginOnchange(e.target.value, 'email')
            }} 
            className={styles.Login.formInput}
            />
          </div> 
          <div className={styles.Login.formDiv}>
            <label htmlFor="password" className={styles.Login.formLabel}>Password</label>
            <MyInput type='password' onChange={(e:any) => {
              loginOnchange(e.target.value, 'password')
            }} 
            className={styles.Login.formInput} />
          </div>
          <MyButton type='submit' label='Submit' className={styles.Login.formButton} />
        </form>
        </div>
    )
}