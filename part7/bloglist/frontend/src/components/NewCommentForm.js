import { useState } from 'react'

import {
  TextField,
  Button
} from '@mui/material'

const NewCommentForm = ({ blog, createComment }) => {
  const [newComment, setNewComment] = useState('')

  const handleCommentChange = (event) => {
    setNewComment(event.target.value)
  }
  const addComment = async (event) => {
    event.preventDefault()

    createComment({
      content: newComment,
      blog: blog.id
    })

    setNewComment('')
  }

  return (
    <div>
      <h2>new comment</h2>
      <form className='submitForm' onSubmit={addComment}>
        <div>
          <TextField
            label='comment'
            type='text'
            value={newComment}
            name='content'
            onChange={handleCommentChange}
          />
        </div>
        <Button variant='contained' type='submit'>comment</Button>
      </form>
    </div>
  )
}

export default NewCommentForm