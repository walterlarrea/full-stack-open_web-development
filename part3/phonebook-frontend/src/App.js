import { useState, useEffect } from 'react'
import personService from './services/people'
import Notification from './components/Notification'

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

const Person = ({ person, handleDeletion }) => <p>{person.name} {person.number} <button onClick={handleDeletion}>delete</button></p>

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [messageStatusAndText, setMessageStatusAndText] = useState(["", null]) // ["OK" or "ERROR", "message"]

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => setPersons(initialPersons))
  }, [])

  const updatePhoneNumber = () => {
    if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
      const person = persons.find(p => p.name.toLowerCase() === newName.toLowerCase())
      const newPerson = { ...person, number: newNumber }

      personService
        .update(newPerson.id, newPerson)
        .then(returnedPerson => {
          setPersons(persons.map(p => p.name !== returnedPerson.name ? p : returnedPerson))

          setMessageStatusAndText([
            "OK",
            `Updated phone number for ${newPerson.name}`])
          setTimeout(() => {
            setMessageStatusAndText(["", null])
          }, 5000)
        })
        .catch(response => {
          setMessageStatusAndText([
            "ERROR",
            `Information of ${newPerson.name} has already been removed from server`])
          setTimeout(() => {
            setMessageStatusAndText(["", null])
          }, 5000)
          setPersons(persons.filter(p => p.id !== newPerson.id))
        })

    }
  }

  const addPerson = (event) => {
    event.preventDefault()

    if (persons.every(p => p.name.toLowerCase() !== newName.toLowerCase())) {
      const newPerson = {
        name: newName,
        number: newNumber,
      }

      personService
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')

          setMessageStatusAndText([
            "OK",
            `Added ${newPerson.name}`])
          setTimeout(() => {
            setMessageStatusAndText(["", null])
          }, 5000)
        })
        .catch(response => {
          setMessageStatusAndText([
            "ERROR",
            `Something went wrong`])
          setTimeout(() => {
            setMessageStatusAndText(["", null])
          }, 5000)
        })
    } else {
      updatePhoneNumber()
    }
  }

  const handleDeletionOf = (id) => {
    if (window.confirm(`Delete ${persons.find(p => p.id === id).name} ?`)) {
      personService
        .remove(id)
        .then(response => setPersons(persons.filter(p => p.id !== id)))
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
      <Notification status={messageStatusAndText[0]} message={messageStatusAndText[1]} />
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

      {personsToShow.map(p => <Person key={p.id} person={p} handleDeletion={() => handleDeletionOf(p.id)} />)}
    </div>
  )
}

export default App