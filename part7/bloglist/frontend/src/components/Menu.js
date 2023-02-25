import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../reducers/userReducer'

const Menu = () => {
  const navBar = {
    backgroundColor: 'silver'
  }
  const navBarItem = {
    paddingRight: 5
  }

  const dispatch = useDispatch()
  const currentUser = useSelector(({ user }) => user.currentUser)

  const handleLogout = () => {
    dispatch(logout())
    window.location.reload()
  }

  return (
    <div>
      <p style={navBar}>
        <Link style={navBarItem} to="/">blogs</Link>
        <Link style={navBarItem} to="/users">users</Link>
        <span style={navBarItem}>{currentUser.name} logged in <button onClick={handleLogout}>logout</button></span>
      </p>
    </div>
  )
}

export default Menu