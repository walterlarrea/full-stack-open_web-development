const Country = ({ name, onClick }) => (
  <>
    <p>{name} <button onClick={onClick} value={name}>show</button></p>
  </>
)

const CountryList = ({ countries, onClick }) => {
  return (
    countries
      .map(c => <Country key={c.name.common} name={c.name.common} onClick={onClick} />)
  )
}

export default CountryList