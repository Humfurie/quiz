import { Button, Group, Modal } from '@mantine/core';
import { useContext, useState } from 'react';
import { ACTIONS } from '../../lib/reducers/actions';
import { FormContext } from '../../lib/useContext/formContext';
import { MyButton } from '../partials/button';
import { QuizQuestion } from './quizQuestion';

export const QuizModal = () => {
    const {state, dispatch} = useContext(FormContext)

    
    const onClick = () => {

    }

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
          <QuizQuestion />

           <MyButton label="Quiz" onClick={(e:any) => {
                onClick()
           }} />
          </div>
          <div>
            
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