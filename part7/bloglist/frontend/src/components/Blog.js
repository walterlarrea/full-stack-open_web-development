import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { deleteBlog, likeBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

import CommentsList from './CommentsList'

const Blog = ({ blog }) => {
  const paragraphStyle = {
    margin: 2,
  }

  const currentUser = useSelector(({ user }) => user.currentUser)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleBlogLike = () => {
    dispatch(likeBlog(blog))

    dispatch(setNotification(`you liked '${blog.title}'`, 10, 'GOOD'))
  }

  const handleBlogRemove = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(deleteBlog(blog.id))

      dispatch(setNotification(`you deleted '${blog.title}`, 10, 'BAD'))

      navigate('/')
    }
  }

  if (!blog) {
    return null
  }

  return (
    <div>
      <h2 style={paragraphStyle}>
        {blog.title} {blog.author}
      </h2>
      <br />
      <a style={paragraphStyle} href={blog.url}>{blog.url}</a>
      <p style={paragraphStyle}>
        {blog.likes} likes
        <button onClick={handleBlogLike}>like</button>
      </p>
      <p style={paragraphStyle}>added by {blog.user?.name}</p>
      <br />

      {currentUser.username === blog.user?.username ?
        <button onClick={handleBlogRemove}>remove</button>
        :
        ''
      }
      <br />
      <CommentsList blog={blog} />
    </div>
  )
}

export default Blog