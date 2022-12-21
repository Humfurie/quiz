import { useContext } from "react"
import { FormContext } from "../../../lib/useContext/formContext"
import { MyButton } from "../../../lib/partials/MyButton"
import { MyInput } from "../../../lib/partials/MyInput"
import { styles } from "../../../styles/style"

export const RegisterForm = () => {
    const { onSubmit, onChange } = useContext(FormContext)
    return (
        <div className={styles.Login.forminDiv}>
             <form className={styles.Login.form} onSubmit={e => {
            e.preventDefault()
            onSubmit()
          }}>
            <div className={styles.Login.formDiv}>
              <label className={styles.Login.formLabel} htmlFor="fullname">Full Name</label>
              <MyInput className={styles.Login.formInput} type="text" onChange={(e:any) => {
                onChange(e.target.value, 'fullname')
              }} />
            </div>
            <div className={styles.Login.formDiv}>
              <label  className={styles.Login.formLabel} htmlFor="email">Email</label>
              <MyInput className={styles.Login.formInput} type='text' onChange={(e:any) => {
                onChange(e.target.value, 'email')
              }} />
            </div>
            <div className={styles.Login.formDiv}>
              <label className={styles.Login.formLabel} htmlFor="password">Password</label>
              <MyInput className={styles.Login.formInput} type='text' onChange={(e:any) => {
                onChange(e.target.value, 'password')
              }} />
            </div>
            <MyButton type='submit' label='Submit' />
          </form>
        </div>
    )
}