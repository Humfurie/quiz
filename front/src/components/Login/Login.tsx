import { Button, ColorPicker, ColorSchemeProvider, Group, Modal, useMantineTheme } from "@mantine/core";
import { useContext } from "react";
import { ACTIONS } from "../../lib/reducers/actions";
import { FormContext } from "../../lib/useContext/formContext";
import { LoginForm } from "./loginForm/LoginForm";
import { RegisterForm } from "./loginForm/RegisterForm";
import { styles } from "../../styles/style";
import { getColorValue } from "@mantine/core/lib/Box/style-system-props/value-getters/get-color-value";

export const Login = () => {
  const { state, dispatch } = useContext(FormContext)

  return (
    <div >
      <Modal
        opened={state.loginModal}
        onClose={() => {
          dispatch({
            type: ACTIONS.CLOSE_LOGIN_MODAL
          })
        }
        }
        shadow="md" radius="md"
        title="Login"
        transition="fade"
        transitionDuration={600}
        transitionTimingFunction="ease"
      >
        <LoginForm />
        <Modal
          opened={state.registerModal}
          onClose={() =>
            dispatch({
              type: ACTIONS.CLOSE_REGISTER_MODAL
            })}
          title="Register"
          shadow="md" radius="md"
          transition="fade"
          transitionDuration={600}
          transitionTimingFunction="ease"
        >
          <RegisterForm />
        </Modal>

        <Group position="center">
          <Button className={styles.Login.formButton} onClick={() =>
            dispatch({
              type: ACTIONS.OPEN_REGISTER_MODAL
            })
          }>Register</Button>
        </Group>
      </Modal>

      <Group position="center">
        <Button className={styles.Login.formButton} onClick={() =>
          dispatch({
            type: ACTIONS.OPEN_LOGIN_MODAL
          })
        }>Login</Button>
      </Group>

    </div>
  )
}