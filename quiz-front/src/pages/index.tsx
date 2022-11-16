import axios from "axios"
import { useState } from "react"
import { Button, Group, Modal } from "@mantine/core";


export default function Home() {

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
    })
  }

  const [loginModal, setloginModal] = useState(false)
  const [registerModal, setRegisterModal] = useState(false)

  return (
    <div >
      <Modal
        opened={loginModal}
        onClose={() => setloginModal(false)}
        title="This is fullscreen modal!"
        fullScreen
      >
        <form onSubmit={e => {
          e.preventDefault()
          loginOnSubmit()
        }}>
          <div>
            <label htmlFor="email">Email</label>
            <input type="text" onChange={e => {
              loginOnchange(e.target.value, 'email')
            }} />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input type="password" onChange={e => {
              loginOnchange(e.target.value, 'password')
            }} />
          </div>
          <button type="submit">Submit</button>
        </form>
        <Modal
          opened={registerModal}
          onClose={() => setRegisterModal(false)}
          title="This is fullscreen modal!"
          fullScreen
        >
          <form onSubmit={e => {
            e.preventDefault()
            onSubmit()
          }}>
            <div>
              <label htmlFor="fullname">Full Name</label>
              <input type="text" onChange={e => {
                onChange(e.target.value, 'fullname')
              }} />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input type="text" onChange={e => {
                onChange(e.target.value, 'email')
              }} />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input type="password" onChange={e => {
                onChange(e.target.value, 'password')
              }} />
            </div>
            <button type="submit">Register</button>
          </form>
        </Modal>

        <Group position="center">
          <Button onClick={() => setRegisterModal(true)}>Register</Button>
        </Group>
      </Modal>

      <Group position="center">
        <Button onClick={() => setloginModal(true)}>Login</Button>
      </Group>

    </div>
  )
}
