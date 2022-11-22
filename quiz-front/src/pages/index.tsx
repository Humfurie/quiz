import { Button, Group, Modal, Table } from '@mantine/core';
import { useState } from 'react';
import { QuizModal } from '../components/QuizModal/quizModal';

export default function Home() {

 const [opened, setOpened] = useState(false)

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
              <th></th>
            </tr>
          </thead>
          {/* {...rows} */}
          <tbody>
            <tr>
              <td>Test</td>
              <td>1</td>
              <td>0</td>
              <td>11</td>
              <td>Published</td>
              <td>...</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </>
  )
}
