import { Button, Group, Modal } from "@mantine/core";
import { useContext } from "react";
import { ACTIONS } from "../../lib/reducers/actions";
import { FormContext } from "../../lib/useContext/formContext";
import { LoginForm } from "./loginForm/LoginForm";
import { RegisterForm } from "./loginForm/RegisterForm";

export const Login = () => {
  const { state, dispatch } = useContext(FormContext)
  return (
    <div >
      <Modal
        opened={state.loginModal}
        onClose={() =>
          dispatch({
            type: ACTIONS.CLOSE_LOGIN_MODAL
          })
        }
        title="Login"
        // className={}
      >
        <LoginForm />
        <Modal
          opened={state.registerModal}
          onClose={() =>
            dispatch({
              type: ACTIONS.CLOSE_REGISTER_MODAL
            })}
          title="Register"
        >
          <RegisterForm />
        </Modal>

        <Group position="center">
          <Button onClick={() =>
            dispatch({
              type: ACTIONS.OPEN_REGISTER_MODAL
            })
          }>Register</Button>
        </Group>
      </Modal>

      <Group position="center">
        <Button onClick={() =>
          dispatch({
            type: ACTIONS.OPEN_LOGIN_MODAL
          })
        }>Login</Button>
      </Group>

    </div>
  )
}