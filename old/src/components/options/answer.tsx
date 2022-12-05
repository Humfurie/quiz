import { Button, Group, Modal } from "@mantine/core"
import { ACTIONS } from "../../lib/reducers/actions"
import { MyButton } from "../partials/button"
import { useContext } from "react"
import { FormContext } from "../../lib/useContext/formContext"

export const Answer = ({newKey , quiz}:any) => {
    const { state, dispatch } = useContext(FormContext)
   return (
    <>
     <Modal
    opened={state.answerModal}
    onClose={() =>
      dispatch({
        type: ACTIONS.ANSWER_CLOSE
      })
    }
    title="Question"
    fullScreen
  >
    {/* Modal content */}
    {quiz.title}
  </Modal>

  <Group position="center">
    <Button key={newKey} onClick={() =>
{

console.log(quiz, 'newKey')
      dispatch({
        type: ACTIONS.ANSWER_OPEN
      })
    }  
}>Open Modal</Button>

</Group>
    </>
   )
}