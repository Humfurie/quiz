import { useContext } from "react"
import { ACTIONS } from "../../../lib/reducers/actions"
import { FormContext } from "../../../lib/useContext/formContext"
import { MyButton } from "../../../lib/partials/MyButton"
import { MyInput } from "../../../lib/partials/MyInput"
import { styles } from "../../../styles/style"

export const QuizForm = () => {
  const { state, dispatch, dataSubmit } = useContext(FormContext)
  console.log(state.user, 'hehe')
  return (
    <form onSubmit={(e: any) => {
      e.preventDefault()
      dataSubmit()
      dispatch({
        type: ACTIONS.CLOSE_QUIZ_MODAL
      })
    }}
    className={styles.Login.formDiv}
    >
      <div className={styles.FormDiv.div}>

        <label htmlFor="">Title</label>
        <MyInput value={state.addQuiz.title} onChange={(e: any) => {
          dispatch({
            type: ACTIONS.ADD_QUIZ,
            quiz: e.target.value
          })
        }}
          className='border-2 border-gray-900 rounded-md'
        />
      </div>
      <div>
        {state.questions && state.questions.map((question: any, qIdx: number) => {
          return (

            <div key={qIdx}>

              question
              <MyInput value={question.title} questionKey={qIdx} onChange={(e: any) => {
                dispatch({
                  type: ACTIONS.EDIT_QUESTION,
                  question: e.target.value,
                  qIdx: qIdx
                })
              }} />

              {/* <div > */}

              {question.choice.map((choice: any, cIdx: number) => {
                return (

                  <div key={cIdx}>

                    choice
                    <div>

                      <MyInput value={choice.title} onChange={(e: any) => {
                        dispatch({
                          type: ACTIONS.EDIT_CHOICE,
                          choice: e.target.value,
                          cIdx: cIdx,
                          qIdx: qIdx
                        })
                      }} />
                      <MyInput type='checkbox' checked={choice.answer} onChange={(e: any) => {
                        dispatch({
                          type: ACTIONS.ANSWER,
                          qIdx: qIdx,
                          cIdx: cIdx,
                          payload: e.target.checked
                        })
                      }} />
                    </div>
                    <MyButton type='button' label='add' choiceKey={cIdx} onClick={(e: any) => {
                      dispatch({
                        type: ACTIONS.CHOICE_BUTTON,
                        qIdx: qIdx,
                        cIdx: cIdx
                      })
                    }} />

                  </div>
                )
              })}

            </div>
          )
        })}
      </div>
      <MyButton type='submit' label='submit' />
    </form>
  )
}