import { createSlice } from '@reduxjs/toolkit'

const initialState = { searchBox: '' }

const filterReducer = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearchBox(state, action) {
      const filterText = action.payload
      state['searchBox'] = filterText
    }
  }
})

export const { setSearchBox } = filterReducer.actions
export default filterReducer.reducer