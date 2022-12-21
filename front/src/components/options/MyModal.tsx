import { Modal } from "@mantine/core"
import { userAgent } from "next/server"
import { useContext } from "react"
import { ACTIONS } from "../../lib/reducers/actions"
import { FormContext } from "../../lib/useContext/formContext"
import { MyInput } from "../../lib/partials/MyInput"

export const MyModal = () => {
    const { currentUser, state, dispatch, answerSubmit } = useContext(FormContext)
    const rows = (
        <>
            {state.modal.title}
            <div>
                {state.modal.question?.map((question: any, idx: number) => (
                    <div key={idx}>
                        {console.log(state.modal)}
                        <p>{question.title}</p>
                        {question.choice?.map((choice: any, cIdx: any) => (
                            <div key={cIdx}>
                                {cIdx + 1} {choice.title}
                                <MyInput type='radio' name={idx} onChange={(e: any) => {
                                    dispatch({
                                        type: ACTIONS.ANSWER_CHECKBOX,
                                        payload: {
                                            questionId: question.id,
                                            choiceId: choice.id,
                                        },
                                        id: idx
                                    })
                                }} defaultChecked={state.answerCheck?.find((item: any) => item.questionId === question.id)?.choice === cIdx}  />
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </>
    )

    return (
        <>
            <Modal
                opened={state.answerModal}
                onClose={() => {

                    dispatch({
                        type: ACTIONS.ANSWER_CLOSE
                    })
                }
                }
                title="Question"
                fullScreen
            >
                <>
                    <form onSubmit={(e: any) => {
                        e.preventDefault()
                        answerSubmit()
                    }}>
                        {rows}
                        <button type="submit">Submit</button>
                    </form>
                </>
            </Modal>
        </>
    )
}