import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'
import userService from '../services/users'

const initialState = {
  currentUser: {},
  usersList: []
}

const userReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentUser(state, action) {
      state['currentUser'] = action.payload
    },
    setUsersList(state, action) {
      state['usersList'] = action.payload
    }
  }
})

export const { setCurrentUser, setUsersList } = userReducer.actions

export const login = (credentials) => {
  return async dispatch => {
    const user = await loginService.login(credentials)

    window.localStorage.setItem(
      'loggedBloglistappUser', JSON.stringify(user)
    )
    blogService.setToken(user.token)
    dispatch(setCurrentUser(user))
  }
}

export const logout = () => {
  return async dispatch => {
    window.localStorage.removeItem('loggedBloglistappUser')
    dispatch(setCurrentUser({}))
  }
}

export const initializeUserList = () => {
  return async dispatch => {
    const usersList = await userService.getAll()

    dispatch(setUsersList(usersList))
  }
}

export const initializeUserSession = () => {
  return async dispatch => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistappUser')

    if (loggedUserJSON && loggedUserJSON !== '' && loggedUserJSON !== '{}') {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      dispatch(setCurrentUser(user))
    }
  }
}

export default userReducer.reducer