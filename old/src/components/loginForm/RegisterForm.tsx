import { useContext } from "react"
import { FormContext } from "../../lib/useContext/formContext"
import { MyButton } from "../partials/MyButton"
import { MyInput } from "../partials/MyInput"

export const RegisterForm = () => {
    const { onSubmit, onChange } = useContext(FormContext)
    return (
        <div>
             <form onSubmit={e => {
            e.preventDefault()
            onSubmit()
          }}>
            <div>
              <label htmlFor="fullname">Full Name</label>
              <MyInput type="text" onChange={(e:any) => {
                onChange(e.target.value, 'fullname')
              }} />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <MyInput type='text' onChange={(e:any) => {
                onChange(e.target.value, 'email')
              }} />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <MyInput type='text' onChange={(e:any) => {
                onChange(e.target.value, 'password')
              }} />
            </div>
            <MyButton type='submit' label='Submit' />
          </form>
        </div>
    )
}