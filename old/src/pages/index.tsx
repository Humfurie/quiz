import { Button, Group, Modal, Table } from '@mantine/core';
import axios from 'axios';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { useState } from 'react';
import { QuizModal } from '../components/QuizModal/quizModal';

export default function Home({ quiz }: any) {
  console.log(quiz)
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
            {quiz.map((quiz: any) => (
              <tr>
                <td>{quiz.title}</td>
                <td>11</td>
                <td>0</td>
                <td>11</td>
                <td>{quiz.status}</td>
                <td>...</td>
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

  return {
    props: {
      quiz: res.data
    }
  }
}
