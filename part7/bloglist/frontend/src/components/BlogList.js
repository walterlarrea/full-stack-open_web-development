import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const BlogList = () => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const blogs = useSelector(({ blogs }) =>
    [...blogs]
      .sort((a, b) => b.likes - a.likes)
  )
  //const currentUser = useSelector(({ user }) => user.currentUser)

  return (
    <div>
      {blogs.map(blog =>
        <div className='blog' style={blogStyle} key={blog.id}>
          <Link to={`/blogs/${blog.id}`}> {blog.title}</Link>
        </div>
      )}
    </div>
  )
}

export default BlogList