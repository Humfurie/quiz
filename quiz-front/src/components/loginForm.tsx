import { Button, Group, Modal } from "@mantine/core";
import { useContext } from "react";
import { FormContext } from "../lib/useContext/formContext";
export const Login = () => {
    const { onChange, onSubmit, loginOnSubmit, loginOnchange} = useContext(FormContext)
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