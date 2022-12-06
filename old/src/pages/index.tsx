import { Table } from '@mantine/core';
import axios from 'axios';
import { useContext } from 'react';
import { Answer } from '../components/options/answer';
import Delete from '../components/options/delete';
import { MyModal } from '../components/options/modal';
import { MyButton } from '../components/partials/button';
import { QuizModal } from '../components/QuizModal/quizModal';
import { ACTIONS } from '../lib/reducers/actions';
import { FormContext } from '../lib/useContext/formContext';

export default function Home({ quiz }: any) {

  const { dispatch } = useContext(FormContext)
  return (
    <>
      <div>
        {/* here goes the quiz modal */}
        <QuizModal />
      </div>
      <div>

        <Table striped>
          <thead>
            <tr>
              <th>Title</th>
              <th>No. of Items</th>
              <th>No. of Responses</th>
              <th>Date Created</th>
              <th>Status</th>
              <th>

              </th>
            </tr>
          </thead>
          {/* {...rows} */}
          <tbody>

            {quiz.map((quiz: any, id: any) => (
              <tr key={quiz.id}>
                <td>{quiz.title}</td>
                <td>{quiz.question.length}</td>
                <td>0</td>
                <td>11</td>
                <td>{quiz.status ? <div>
                  <p>Published</p>
                </div> : <div>
                  <p>Draft</p>
                </div>}</td>
                <td>
                  <div><Answer newKey={id} quiz={quiz} /></div>
                  <p>update</p>
                  <div><MyButton type='button' label="delete" onClick={(e: any) => {
                    dispatch({
                      type: ACTIONS.OPEN_DELETE,
                      payload: quiz.id
                    })
                  }} /></div>
                </td>
              </tr>
            ))}

          </tbody>
        </Table>
        {/* Modals */}
        <MyModal />
        <Delete />
      </div>
    </>
  )
}

export const getServerSideProps = async () => {

  const res = await axios.get(`http://127.0.0.1:3333/main`)
  return {
    props: {
      quiz: res.data
    }
  }
}
