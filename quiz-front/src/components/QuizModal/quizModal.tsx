import { Button, Group, Modal } from '@mantine/core';
import { useContext, useState } from 'react';
import { ACTIONS } from '../../lib/reducers/actions';
import { FormContext } from '../../lib/useContext/formContext';
import { MyButton } from '../partials/button';
import { Input } from '../partials/input';
import { QuizQuestion } from './quizQuestion';

export const QuizModal = () => {
  const { state, dispatch } = useContext(FormContext)

  console.log(state)
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
                <Input value={state.addQuiz.title} onChange={(e: any) => {
                  dispatch({
                    type: ACTIONS.QUIZ_CHANGE,
                    quiz: e.target.value
                  })
                }} />
                <div>
                  {state.addQuiz.questions.map((question: any, qIdx: number) => {
                    return (

                      <div>
                        <Input value={question.title} onChange={(e: any) => {
                          dispatch({
                            type: ACTIONS.QUESTION_CHANGE,
                            question: e.target.value
                          })
                        }} />

                        <div key={qIdx}>
                          {question.choice.map((choice: any, cIdx: number) => {
                            return (

                              <div key={cIdx}>
                                <Input value={choice.title} onChange={(e: any) => {
                                  dispatch({
                                    type: ACTIONS.CHOICE_CHANGE,
                                    choice: e.target.value
                                  })
                                }} />
                              </div>

                            )
                          })}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            
          </div>

          <MyButton label="Quiz" onClick={(e: any) => {
            dispatch({
              type: ACTIONS.ADD_QUESTION
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