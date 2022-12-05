import { Table } from '@mantine/core';
import axios from 'axios';
import { Answer } from '../components/options/answer';
import { QuizModal } from '../components/QuizModal/quizModal';

export default function Home({ quiz }: any) {

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
                </div> }</td>
                <td>
                  <div><Answer newKey={id} quiz={quiz} /></div>
                  <p>update</p>
                  <p>delete</p>
                </td>
              </tr>
            ))}

          </tbody>
        </Table>
      </div>
    </>
  )
}

export const getServerSideProps = async () => {

  const res = await axios.get(`http://127.0.0.1:3333/main`)
  console.log(res, 'res')
  return {
    props: {
      quiz: res.data
    }
  }
}
