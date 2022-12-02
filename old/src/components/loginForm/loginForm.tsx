import { useContext } from "react"
import { FormContext } from "../../lib/useContext/formContext"
import { MyButton } from "../partials/button"
import { Input } from "../partials/input"

export const LoginForm = () => {
const { loginOnSubmit, loginOnchange} = useContext(FormContext)

    return (
        <div>
<form onSubmit={e => {
          e.preventDefault()
          loginOnSubmit()
        }}>
          <div>
            <label htmlFor="email">Email</label>
            <Input type='text' onChange={(e:any) => {
              loginOnchange(e.target.value, 'email')
            }} />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <Input type='text' onChange={(e:any) => {
              loginOnchange(e.target.value, 'password')
            }}  />
          </div>
          <MyButton type='submit' label='Submit' />
        </form>
        </div>
    )
}