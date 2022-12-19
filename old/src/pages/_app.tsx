import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useCallback, useEffect, useMemo } from 'react'
import { interceptor } from '../axios/axiosInterceptor'
import Router from 'next/router'
import { FormContext } from '../lib/useContext/formContext'
import axios from "axios"
import { useReducer, useState } from "react"
import { setCookie } from 'nookies'
import { initialState } from "../lib/reducers/initialState";
import { reducer } from "../lib/reducers/reducer";


export default function App({ Component, pageProps }: AppProps) {


  useMemo(
    async () => {
      try {
        const res = await interceptor.get(`http://127.0.0.1:3333/auth`)
        setCurrentUser(res.data.user.id)
        setCurrentExaminee(res.data)
        
        console.log(res, "userData")
        Router.push('/')
      } catch (error) {
        Router.push('/landing')
      }
    }, [])

  const [currentUser, setCurrentUser] = useState([])
  const [currentExaminee, setCurrentExaminee] = useState([])
  console.log(currentExaminee)
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
    })
    location.reload()
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
      console.log(res)
      const token = res.data.token
      setCookie({}, 'JWTtoken', token, {
        maxAge: 30 * 24 * 60 * 60,
      })
    })
    location.reload()
  }



  const dataSubmit = async () => {
    const quizTitle = state.addQuiz.title
    const quizStatus = state.addQuiz.status
    await interceptor.post(`http://127.0.0.1:3333/quiz`, {
      title: quizTitle,
      status: quizStatus,
      question: state.questions
    }).then(res => {
      console.log(res, 'this is res')
    })
  }

  const answerSubmit = async () => {
    await interceptor.post(`http://127.0.0.1:3333/answer`, {
      answer: state.answerCheck
    })
  }
  console.log('currentUser', currentUser)




  return (
    <>
      <FormContext.Provider value={{
        onChange,
        onSubmit,
        loginOnSubmit,
        loginOnchange,
        state,
        dispatch,
        dataSubmit,
        answerSubmit,
        currentUser,
      }}>
        <Component {...pageProps} />
      </FormContext.Provider>
    </>
  )
}
