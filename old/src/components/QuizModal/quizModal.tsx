
import { Button, Modal, Group } from '@mantine/core';
import { useContext } from 'react';
import { ACTIONS } from '../../lib/reducers/actions';
import { FormContext } from '../../lib/useContext/formContext';
import { MyButton } from '../partials/button';
import { QuizForm } from './QuizModalComp/quizForm';

export const QuizModal = () => {
  const { state, dispatch } = useContext(FormContext)

  console.log(state.questions, 'question state')
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
              quiz            
              <QuizForm />
          </div>
          <div>
          <MyButton label="Quiz" onClick={(e: any) => {
            dispatch({
              type: ACTIONS.INITIAL_QUESTION
            })
          }} />
          </div>

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