import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Users = () => {
  const usersList = useSelector(({ user }) => user.usersList)

  return (
    <>
      <h2>Users</h2>

      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>

          {usersList.map(user =>
            <tr key={user.id} >
              <th><Link to={`/users/${user.id}`}> {user.name} </Link></th>
              <th>{user.blogs.length} </th>
            </tr>
          )}
        </tbody>
      </table>
    </>
  )
}

export default Users