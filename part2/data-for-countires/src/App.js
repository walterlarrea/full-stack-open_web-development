import { useState, useEffect } from 'react'
import axios from 'axios'

import CountryList from './components/CountryList'
import CountryInfo from './components/CountryInfo'

const Search = (props) => (
  <div>
    <p>find countires <input onChange={props.onChange} value={props.value} /></p>
  </div>
)

const Countries = ({ countries, onClick }) => {
  if (countries.length > 10) {
    return (
      <div>
        <p>Too many matches, specify another filter</p>
      </div>
    )
  } else if (countries.length === 1) {
    return <CountryInfo country={countries[0]} />
  } else {
    return <CountryList countries={countries} onClick={onClick} />
  }
}

function App() {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')

  const COUNTIRES_API_ALL = 'https://restcountries.com/v3.1/all'

  useEffect(() => {
    axios
      .get(COUNTIRES_API_ALL)
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleSearchChange = (event) => setSearch(event.target.value)

  const handleShowCountry = (event) => setSearch(event.target.value)

  const countriesToShow = countries.filter(c => c.name.common.toLowerCase().search(search.toLowerCase()) >= 0)

  return (
    <div>
      <Search onChange={handleSearchChange} value={search} />
      <Countries countries={countriesToShow} onClick={handleShowCountry} />
    </div>
  );
}

export default App;
