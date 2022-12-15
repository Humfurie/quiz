import { Button, Group } from "@mantine/core"
import { ACTIONS } from "../../lib/reducers/actions"
import { useContext } from "react"
import { FormContext } from "../../lib/useContext/formContext"

export const Answer = ({ newKey, quiz }: any) => {
  const { state, dispatch } = useContext(FormContext)
  return (
    <>
      <Group position="center">
        <Button key={newKey} onClick={() => {
          dispatch({
            type: ACTIONS.ANSWER_OPEN,
            payload: quiz
          })
        }
        }>Answer</Button>

      </Group>
    </>
  )
}