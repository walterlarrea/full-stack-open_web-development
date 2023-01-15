import React from 'react'
import ReactDOM from 'react-dom/client'
//import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './App'
// import reducer from './reducers/anecdoteReducer'

import store from './store'

// const store = createStore(reducer)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
