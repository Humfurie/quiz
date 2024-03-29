import "../styles/globals.css"
import type { AppProps } from 'next/app'
import { useCallback, useEffect, useMemo } from 'react'
import { interceptor } from '../axios/axiosInterceptor'
import { useRouter } from 'next/router'
import { FormContext } from '../lib/useContext/formContext'
import axios from "axios"
import { useReducer, useState } from "react"
import { destroyCookie, setCookie } from 'nookies'
import { initialState } from "../lib/reducers/initialState";
import { reducer } from "../lib/reducers/reducer";
import { ACTIONS } from "../lib/reducers/actions"


export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()

  const test = useCallback(
    async () => {
      try {
        const res = await interceptor.get(`http://127.0.0.1:3333/auth`)
        setCurrentUser(res.data.user.id)

        router.push('/')
      } catch (error) {
        router.push('/landing')
      }
    }, [])

  useEffect(() => {
    test()
  }, [test])

  const [currentUser, setCurrentUser] = useState(null)
  const [state, dispatch] = useReducer(reducer, initialState)
  const [registrationForm, setRegistrationForm] = useState({
    fullname: '',
    email: '',
    password: '',
  })

  const onChange = (value: any, column: string) => {
    setRegistrationForm(prev => {
      return { ...prev, [column]: value }
    })
  }

  const onSubmit = async () => {

    await axios.post(`http://127.0.0.1:3333/registration`, {
      fullname: registrationForm.fullname,
      email: registrationForm.email,
      password: registrationForm.password,
    })
    router.push('/')
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

    await test()

    router.push('/')
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
      answer: state.answerCheck,
      userId: currentUser,
      quizId: state.modal.id
    })
    dispatch({
      type: ACTIONS.ANSWER_CLOSE
    })
    state.answerCheck = []
  }
  console.log('currentUser', currentUser)
  //delete Cookies
  const deleteCookies = () => {
    destroyCookie({}, 'JWTtoken')
  }
  return (
    <>
      <FormContext.Provider value={{
        deleteCookies,
        onChange,
        onSubmit,
        loginOnSubmit,
        loginOnchange,
        state,
        dispatch,
        dataSubmit,
        answerSubmit,
        currentUser,
        test
      }}>
        <Component {...pageProps} />
      </FormContext.Provider>
    </>
  )
}
