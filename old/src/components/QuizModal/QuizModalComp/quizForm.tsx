import { useContext } from "react"
import { ACTIONS } from "../../../lib/reducers/actions"
import { FormContext } from "../../../lib/useContext/formContext"
import { MyButton } from "../../partials/button"
import { Input } from "../../partials/input"

export const QuizForm = () => {
  const { state, dispatch, dataSubmit } = useContext(FormContext)
  
  return (
    <form onSubmit={dataSubmit}>

      <Input value={state.addQuiz.title} onChange={(e: any) => {

        dispatch({
          type: ACTIONS.ADD_QUIZ,
          quiz: e.target.value
        })
      }} />

      <div>
        {state.questions && state.questions.map((question: any, qIdx: number) => {
          return (

            <div key={qIdx}>

              question
              <Input value={question.title} questionKey={qIdx} onChange={(e: any) => {
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

                    <Input value={choice.title} onChange={(e: any) => {
                      dispatch({
                        type: ACTIONS.EDIT_CHOICE,
                        choice: e.target.value,
                        cIdx: cIdx,
                        qIdx: qIdx
                      })
                    }} />
                    <Input type='checkbox' checked={choice.answer} onChange={(e:any) => {
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
              {/* </div> */}
            </div>
          )
        })}
      </div>
      <MyButton type='submit' label='submit' />
    </form>
  )
}