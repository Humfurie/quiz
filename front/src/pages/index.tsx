import { Table } from '@mantine/core';
import { useContext, useEffect } from 'react';
import { interceptor } from '../axios/axiosInterceptor';
import { Answer } from '../components/options/Answer';
import Delete from '../components/options/Delete';
import { MyModal } from '../components/options/MyModal';
import { MyButton } from '../lib/partials/MyButton';
import { QuizModal } from '../components/QuizModal/quizModal';
import { ACTIONS } from '../lib/reducers/actions';
import { FormContext } from '../lib/useContext/formContext';
import { useRouter } from 'next/router';
import { styles } from '../styles/style';
import Moment from 'react-moment';

export default function Home({ quiz }: any) {
  const router = useRouter()
  const { dispatch, deleteCookies, test } = useContext(FormContext)

  useEffect(() => {
    test()
  }, [test])
  console.log(quiz)
  return (
    <div className={styles.index.mainBody}>
      <div >
        {/* here goes the quiz modal */}
        <QuizModal />
      </div>
      <div>
        <MyButton label='logout' onClick={(e: any) => {
          deleteCookies()
          router.reload()
        }}
          className={styles.Login.formButton}
        />
        <div className='px-2 py-2 w-full'>
          <Table striped >

            <thead className='px-2 py-2 w-full'>
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
                  <td><Moment format="YYYY/MM/DD">
                    {quiz.Created}
                  </Moment></td>
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
                    }}
                      className={styles.Login.formButton}
                    /></div>
                  </td>
                </tr>
              ))}

            </tbody>
          </Table>
        </div>
        {/* Modals */}
        <MyModal />
        <Delete />

      </div>
    </div>
  )
}

export const getServerSideProps = async () => {

  const res = await interceptor.get(`http://127.0.0.1:3333/main`)
  return {
    props: {
      quiz: res.data
    }
  }
}
