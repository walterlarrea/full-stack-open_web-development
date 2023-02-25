import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationReducer'

import {
  TextField,
  Button
} from '@mui/material'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const centerGridStyle = {
    display: 'grid',
    gridGap: '20px',
    gridTemplateColumns: '1fr',
    justifyItems: 'center'
  }

  const dispatch = useDispatch()

  const handleLogin = (event) => {
    event.preventDefault()
    dispatch(login({ username, password }))

    setUsername('')
    setPassword('')
    dispatch(setNotification('successfully logged in', 10, 'GOOD'))
  }

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }
  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  return (
    <div style={centerGridStyle} >
      <h2>Log in to application</h2>

      <form style={centerGridStyle} onSubmit={handleLogin}>
        <div>
          <TextField
            label='username'
            type="text"
            value={username}
            name="username"
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          <TextField
            label='password'
            type="password"
            value={password}
            name="password"
            onChange={handlePasswordChange}
          />
        </div>
        <Button variant='contained' color='primary' id='login-button' type="submit">
          login
        </Button>
      </form>
    </div >
  )
}

export default LoginForm