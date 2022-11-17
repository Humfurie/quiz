import { Table } from '@mantine/core';

export default function Home() {

  

  return (
    <>


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
    </>
  )
}
