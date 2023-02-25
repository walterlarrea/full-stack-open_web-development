import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  message: '',
  lastTimeOutID: -1,
  type: ''
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotification(state, action) {
      const notification = action.payload
      state['message'] = notification.text
      state['type'] = notification.type
    },
    clearNotification(state) {
      state['message'] = ''
      state['lastTimeOutID'] = -1
    },
    setLastNotificationTimeOut(state, action) {
      state['lastTimeOutID'] = action.payload
    }
  }
})

export const { showNotification, clearNotification, setLastNotificationTimeOut } = notificationSlice.actions

export const setNotification = (text, timeInSeconds, type) => {
  return async (dispatch, getState) => {
    let timeOutID = -1
    const delaySecondsWhenOtherNotificationWasCleared = 5
    const lastTimeOutID = getState().notification.lastTimeOutID
    dispatch(showNotification({ text: text, type: type }))

    if (lastTimeOutID > -1) {
      clearTimeout(lastTimeOutID)

      timeOutID = setTimeout(() => {
        dispatch(clearNotification())
      }, delaySecondsWhenOtherNotificationWasCleared * 1000)
    } else {
      timeOutID = setTimeout(() => {
        dispatch(clearNotification())
      }, timeInSeconds * 1000)
    }

    dispatch(setLastNotificationTimeOut(timeOutID))
  }
}

export default notificationSlice.reducer