import { useState } from 'react'

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
          <input
            id='new-comment-content'
            type='text'
            value={newComment}
            name='content'
            onChange={handleCommentChange}
          />
        </div>
        <button type='submit'>comment</button>
      </form>
    </div>
  )
}

export default NewCommentForm