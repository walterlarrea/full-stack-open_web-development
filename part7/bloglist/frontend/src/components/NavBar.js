import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../reducers/userReducer'

import {
  Button,
  AppBar,
  Toolbar,
  IconButton,
  Tooltip
} from '@mui/material'

const Menu = () => {
  // const navBar = {
  //   backgroundColor: 'silver'
  // }
  // const navBarItem = {
  //   paddingRight: 5
  // }

  const dispatch = useDispatch()
  const currentUser = useSelector(({ user }) => user.currentUser)

  const handleLogout = () => {
    dispatch(logout())
    window.location.reload()
  }

  return (
    <AppBar>
      <Toolbar>
        <IconButton edge='start' color='inherit' aria-label='menu'>
        </IconButton>
        <Button color='inherit' component={Link} to="/">
          blogs
        </Button>
        <Button color='inherit' component={Link} to="/users">
          users
        </Button>
        <Tooltip title='Logout'>
          <Button color="inherit" onClick={handleLogout}>
            {currentUser
              ? <em>{currentUser.name} logged in</em>
              : <Link to="/login">login</Link>
            }
          </Button>
        </Tooltip>
      </Toolbar>
    </AppBar>
  )
}

// OLD NAV BAR
{/* <div>
<p style={navBar}>
  <Link style={navBarItem} to="/">blogs</Link>
  <Link style={navBarItem} to="/users">users</Link>
  <span style={navBarItem}>{currentUser.name} logged in <button onClick={handleLogout}>logout</button></span>
</p>
</div> */}

export default Menu