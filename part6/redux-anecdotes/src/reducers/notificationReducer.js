import { createSlice } from '@reduxjs/toolkit'

const initialState = { message: '' }

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotification(state, action) {
      const message = action.payload
      state['message'] = message
    },
    clearNotification(state, action) {
      state['message'] = ''
    }
  }
})

export const { showNotification, clearNotification } = notificationSlice.actions

export const setNotification = (text, timeInSeconds) => {
  return async dispatch => {
    dispatch(showNotification(text))
    setTimeout(() => {
      dispatch(clearNotification())
    }, timeInSeconds * 1000)
  }
}

export default notificationSlice.reducer