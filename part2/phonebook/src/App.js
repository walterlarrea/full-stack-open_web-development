import { useState } from 'react'

const Filter = (props) => {
  return (
    <div>
      filter shown with
      <input onChange={props.onChange} value={props.value} />
    </div>
  )
}

const PersonsForm = (props) => {
  return (
    <form onSubmit={props.onSubmit}>
      <div>name: <input onChange={props.onChangeName} value={props.newNameValue} /></div>
      <div>number: <input onChange={props.onChangeNumber} value={props.newNumberValue} /></div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Person = ({ person }) => <p>{person.name} {person.number}</p>

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const addPerson = (event) => {
    event.preventDefault()

    if (persons.every(p => p.name.toLowerCase() !== newName.toLowerCase())) {
      const newPerson = {
        name: newName,
        number: newNumber,
        id: persons.length + 1
      }

      setPersons(persons.concat(newPerson))
      setNewName('')
      setNewNumber('')
    } else {
      alert(`${newName} is already added to phonebook`)
    }
  }

  const handleNewNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const personsToShow = persons.filter(p => p.name.toLowerCase().search(filter.toLowerCase()) >= 0)

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter onChange={handleFilterChange} value={filter} />

      <h3>Add a new</h3>

      <PersonsForm
        onSubmit={addPerson}
        onChangeName={handleNewNameChange}
        onChangeNumber={handleNewNumberChange}
        newNameValue={newName}
        newNumberValue={newNumber}
      />

      <h3>Numbers</h3>

      {personsToShow.map(p => <Person key={p.id} person={p} />)}
    </div>
  )
}

export default App