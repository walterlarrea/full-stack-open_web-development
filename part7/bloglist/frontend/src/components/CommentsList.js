import { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { commentBlog } from '../reducers/blogReducer'

import NewCommentForm from './NewCommentForm'
import Togglable from './Togglable'

import commentService from '../services/comments'
import { setNotification } from '../reducers/notificationReducer'

const CommentsList = ({ blog }) => {

  const commentFormRef = useRef()
  const dispatch = useDispatch()

  const addComment = async (commentObject) => {
    commentFormRef.current.toggleVisibility()
    try {
      const response = await commentService.create(commentObject)
      const commentedBlog = { ...blog, comments: blog.comments.concat(response) }

      dispatch(commentBlog(commentedBlog))
    } catch (exception) {
      setNotification('A problem occured during operation', 5, 'BAD')
    }
  }

  return (
    <div>
      <h3>comments</h3>

      <Togglable buttonLabel='add comment' ref={commentFormRef}>
        <NewCommentForm blog={blog} createComment={addComment} />
      </Togglable>
      <ul>
        {blog.comments.map(comment =>
          <li key={comment.id}>
            {comment.content}
          </li>
        )}
      </ul>
    </div>
  )
}

export default CommentsList