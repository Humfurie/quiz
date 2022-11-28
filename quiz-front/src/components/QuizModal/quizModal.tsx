import { Button, Group, Modal } from '@mantine/core';
import { useContext, useState } from 'react';
import { ACTIONS } from '../../lib/reducers/actions';
import { FormContext } from '../../lib/useContext/formContext';
import { MyButton } from '../partials/button';
import { Input } from '../partials/input';
import { QuizQuestion } from './quizQuestion';

export const QuizModal = () => {
  const { state, dispatch } = useContext(FormContext)

  console.log(state.questions, 'state')
  return (
    <>
      <Modal
        opened={state.quizModal}
        onClose={() =>
          dispatch({
            type: ACTIONS.CLOSE_QUIZ_MODAL
          })
        }
        title="Question"
        fullScreen
      >
        {/* Modal content */}
        <div>

          <div>
            <div>
              quiz
                <Input value={state.addQuiz.title} onChange={(e: any) => {
                  dispatch({
                    type: ACTIONS.ADD_QUIZ,
                    quiz: e.target.value
                  })
                }} />
                <div>
                  question
                  {state.questions.map((question: any, qIdx: number) => {
                    // console.log(question, 'patay')
                    return (
                      <div>
                        <Input value={question.title} onChange={(e: any) => {
                          dispatch({
                            type: ACTIONS.EDIT_QUESTION,
                            question: e.target.value,
                            qIdx: qIdx
                          })
                        }} />
                        <div key={qIdx}> 
                        choice                                         
                          {/* {question.choice.map((choice: any, cIdx: number) => {
                            return (
                              <div key={cIdx}>
                                <Input value={choice.title} onChange={(e: any) => {
                                  dispatch({
                                    type: ACTIONS.EDIT_CHOICE,
                                    choice: e.target.value,
                                    cIdx: cIdx,
                                    qIdx: qIdx
                                  })
                                }} />
                              </div>

                            )
                          })} */}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            
          </div>

          <MyButton label="Quiz" onClick={(e: any) => {
            dispatch({
              type: ACTIONS.INITIAL_QUESTION
            })
          }} />

        </div>
      </Modal>

      <Group position="center">
        <Button onClick={() =>
          dispatch({
            type: ACTIONS.OPEN_QUIZ_MODAL
          })
        }>Open Modal</Button>
      </Group>
    </>
  )
}