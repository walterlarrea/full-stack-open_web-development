import { useState } from "react"
import { useMutation } from '@apollo/client'
import { EDIT_BIRTHDATE, ALL_AUTHORS, ALL_BOOKS } from '../queries'

const EditAuthor = ({ authors }) => {
  const [name, setName] = useState('')
  const [birthDate, setBirthDate] = useState('')

  const [changeBirthDate] = useMutation(EDIT_BIRTHDATE, {
    refetchQueries: [{ query: ALL_AUTHORS }, { query: ALL_BOOKS }],
  })

  const submit = (event) => {
    event.preventDefault()

    changeBirthDate({ variables: { name, setBornTo: Number(birthDate) } })

    setName('')
    setBirthDate('')
  }

  return (
    <div style={{ marginTop: '20px' }}>
      <form onSubmit={submit}>
        <div>
          name
          <select
            value={name}
            onChange={({ target }) => setName(target.value)}
            required
          >
            <option value=''>Select author</option>
            {authors.map(a =>
              <option value={a.name}>{a.name}</option>
            )}
          </select>
          {/* <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          /> */}
        </div>
        <div>
          born
          <input
            value={birthDate}
            onChange={({ target }) => setBirthDate(target.value)}
            min={1}
            required
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default EditAuthor