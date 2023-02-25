import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  ListItemButton,
  ListItemText,
  Paper
} from '@mui/material'

const Users = () => {
  const usersList = useSelector(({ user }) => user.usersList)

  return (
    <>
      <h2>Users</h2>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>blogs created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {usersList.map(user =>
              <TableRow key={user.id} >
                <TableCell>
                  <ListItemButton component={Link} to={`/users/${user.id}`} >
                    <ListItemText >{user.name}</ListItemText>
                    {user.name}
                  </ListItemButton>
                </TableCell>
                <TableCell>
                  {user.blogs.length}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default Users