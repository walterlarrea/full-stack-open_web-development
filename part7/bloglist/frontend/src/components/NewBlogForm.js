import { useState } from 'react'

import {
  TextField,
  Button
} from '@mui/material'

const NewBlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const startGridStyle = {
    display: 'grid',
    gridGap: '20px',
    gridTemplateColumns: '1fr',
    justifyItems: 'start'
  }

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }
  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }
  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()

    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    })

    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form style={startGridStyle} className='submitForm' onSubmit={addBlog}>
        <div>
          <TextField
            label='title'
            type='text'
            value={newTitle}
            name='title'
            onChange={handleTitleChange}
          />
        </div>
        <div>
          <TextField
            label='author'
            type='text'
            value={newAuthor}
            name='author'
            onChange={handleAuthorChange}
          />
        </div>
        <div>
          <TextField
            label='url'
            type='text'
            value={newUrl}
            name='url'
            onChange={handleUrlChange}
          />
        </div>
        <Button style={{ marginBottom: 20 }} variant='contained' type='submit'>create</Button>
      </form>
    </div >
  )
}

export default NewBlogForm