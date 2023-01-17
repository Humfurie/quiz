
import { Button, Modal, Group } from '@mantine/core';
import { useContext } from 'react';
import { ACTIONS } from '../../lib/reducers/actions';
import { FormContext } from '../../lib/useContext/formContext';
import { MyButton } from '../../lib/partials/MyButton';
import { QuizForm } from './QuizModalComp/quizForm';
import { styles } from '../../styles/style';

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
        size="xl"
        overflow="inside"
        title="QUIZ"
      >
        {/* Modal content */}
        <div>
          <div>
                       
              <QuizForm />
          </div>
          <div>
          <MyButton label="Quiz" onClick={(e: any) => {
            dispatch({
              type: ACTIONS.INITIAL_QUESTION
            })
          }}
          className={styles.Login.formButton} 
          />
          </div>

        </div>
      </Modal>
          <div className='flex justify-end'>
        <MyButton onClick={() =>
          dispatch({
            type: ACTIONS.OPEN_QUIZ_MODAL
          })
        }
        className={styles.Login.formButton}
        label="Add Quiz" 
        />
        </div>

    </>
  )
}