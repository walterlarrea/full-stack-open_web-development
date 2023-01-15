import { configureStore } from '@reduxjs/toolkit'
// import { createStore } from 'redux'
import anecdoteReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import filterReducer from './reducers/filterReducer'

// const store = createStore(anecdoteReducer)

const store = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    notification: notificationReducer,
    filters: filterReducer
  }
})

export default store