import { ACTIONS } from "../../lib/reducers/actions"
import { useContext } from "react"
import { FormContext } from "../../lib/useContext/formContext"
import { styles } from "../../styles/style"
import { MyButton } from "../../lib/partials/MyButton"

export const Answer = ({ newKey, quiz }: any) => {
  const { state, dispatch } = useContext(FormContext)
  return (
    <>
      <MyButton key={newKey} onClick={() => {
        dispatch({
          type: ACTIONS.ANSWER_OPEN,
          payload: quiz
        })
      }}
        className={styles.Login.formButton}
        label="Answer"
      />
    </>
  )
}