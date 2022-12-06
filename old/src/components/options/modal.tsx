import { Modal } from "@mantine/core"
import { useContext } from "react"
import { ACTIONS } from "../../lib/reducers/actions"
import { FormContext } from "../../lib/useContext/formContext"

export const MyModal = () => {
    const { state, dispatch } = useContext(FormContext)
    const rows = (
        <>
        {state.modal.title}
                        <div>
                            {state.modal.question?.map((question: any, idx: number) => (
                                <div key={idx}>
                                    <p>{question.title}</p>
                                    {question.choice?.map((choice: any, cIdx: any) => (
                                        <div key={cIdx}>
                                            {cIdx + 1} {choice.title}
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
                    <form>                 
                        {rows}
                        <button type="submit">Submit</button>
                    </form>
                </>
            </Modal>
        </>
    )
}