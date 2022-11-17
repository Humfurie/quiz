import axios from "axios"
import { useReducer, useState } from "react"
import { setCookie } from 'nookies'
import Router from "next/router";
import { FormContext } from "../lib/useContext/formContext";
import { Login } from "../components/loginForm";
import { initialState } from "../lib/reducers/initialState";
import { reducer } from "../lib/reducers/reducer";


export default function Landing() {

    const [state, dispatch] = useReducer(reducer, initialState)
    
    const [form, setForm] = useState({
        fullname: '',
        email: '',
        password: '',
      })
    
      const onChange = (value: any, column: string) => {
        setForm(prev => {
          return { ...prev, [column]: value }
        })
      }
    
      const onSubmit = async () => {
    
        await axios.post(`http://127.0.0.1:3333/registration`, {
          fullname: form.fullname,
          email: form.email,
          password: form.password,
        }).then(res => {
          const token = res.data.token
          setCookie({}, 'JWTtoken', token, {
            maxAge: 30 * 24 * 60 * 60,
          })
        })
        Router.push('/')
      }
    
      const [loginForm, setLoginForm] = useState({
        email: '',
        password: '',
      })
    
      const loginOnchange = (value: any, column: string) => {
        setLoginForm(prev => {
          return { ...prev, [column]: value }
        })
      }
    
      const loginOnSubmit = async () => {
        await axios.post(`http://127.0.0.1:3333/login`, {
          email: loginForm.email,
          password: loginForm.password,
        }).then(res => {
          const token = res.data.token
          setCookie({}, 'JWTtoken', token, {
            maxAge: 30 * 24 * 60 * 60,
          })
        })
        Router.push('/')
      }
    
      const [loginModal, setloginModal] = useState(false)
      const [registerModal, setRegisterModal] = useState(false)
    return(
        <>
        <FormContext.Provider value={{onChange, onSubmit, loginOnSubmit, loginOnchange, state, dispatch}}>
            <Login />
        </FormContext.Provider>
        </>
    )
}