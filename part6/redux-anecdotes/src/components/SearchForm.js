import { useDispatch } from 'react-redux'
import { setSearchBox } from '../reducers/filterReducer'

const SearchForm = (props) => {
  const dispatch = useDispatch()

  const handleSearchInput = (event) => {
    const searchText = event.target.value
    dispatch(setSearchBox(searchText))
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      <p>
        filter
        <input
          type='search'
          onInput={handleSearchInput}
        />
      </p>
    </div>
  )
}

export default SearchForm