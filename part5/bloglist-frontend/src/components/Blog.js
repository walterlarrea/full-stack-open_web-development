import { useState } from 'react'

const Blog = ({ blog, blogLike, blogRemove, currentUser }) => {
  const [showDetails, setShowDetails] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const paragraphStyle = {
    margin: 2,
    fontSize: '1.2em',
  }

  const toggleDetailsView = () => {
    setShowDetails(!showDetails)
  }

  const handleBlogLike = () => {
    blogLike()
  }

  const handleBlogRemove = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      blogRemove()
    }
  }

  return (
    showDetails ?
      <div className='blog' style={blogStyle}>
        <p style={paragraphStyle}>
          {blog.title} {blog.author}
          <button onClick={toggleDetailsView} >hide</button>
        </p>
        <p style={paragraphStyle}>{blog.url}</p>
        <p style={paragraphStyle}>
          likes: {blog.likes}
          <button onClick={handleBlogLike}>like</button>
        </p>
        <p style={paragraphStyle}>{blog.user?.name}</p>

        {currentUser.username === blog.user?.username ?
          <button onClick={handleBlogRemove}>remove</button>
          :
          ''
        }
      </div>
      :
      <div className='blog' style={blogStyle}>
        <p style={paragraphStyle}>
          {blog.title} {blog.author}
          <button onClick={toggleDetailsView} >view</button>
        </p>
      </div>
  )
}

export default Blog