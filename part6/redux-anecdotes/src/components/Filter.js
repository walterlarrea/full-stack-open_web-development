import { connect } from 'react-redux'
import { setSearchBox } from '../reducers/filterReducer'

const Filter = (props) => {
  const handleSearchInput = (event) => {
    const searchText = event.target.value
    props.setSearchBox(searchText)
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

export default connect(
  null,
  { setSearchBox }
)(Filter)