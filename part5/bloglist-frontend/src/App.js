import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [messageStatusAndText, setMessageStatusAndText] = useState(['', null]) // ["OK" or "ERROR", "message"]
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs => {
      let sortedBlogs = [...blogs]
      sortedBlogs.sort((a, b) => b.likes - a.likes)
      setBlogs(sortedBlogs)
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      setUser(user)
    }
  }, [])

  const showNotification = ([type, msg]) => {
    setMessageStatusAndText([type, msg])
    setTimeout(() => {
      setMessageStatusAndText(['', null])
    }, 5000)
  }

  const handleLogin = async ({ username, password }) => {
    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedBloglistappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
    } catch (exception) {
      showNotification(['ERROR', 'wrong username or password'])
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBloglistappUser')
    window.location.reload()
  }

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    try {
      const response = await blogService.create(blogObject)

      setBlogs(blogs.concat(response))

      showNotification(['OK', `a new blog ${blogObject.title} by ${blogObject.author} added`])

    } catch (exception) {
      showNotification(['ERROR', 'There was a problem, failed to save the new blog'])
    }
  }

  const likeABlog = async (id) => {
    const blog = blogs.find(b => b.id === id)
    const changedBlog = { ...blog, likes: blog.likes + 1 }

    try {
      const returnedBlog = await blogService.update(id, changedBlog)
      setBlogs(blogs.map(b => b.id !== id ? b : returnedBlog))
    } catch (exception) {
      showNotification(['ERROR', 'There was a problem, failed to update number of likes'])
    }
  }

  const removeBlog = async (id) => {
    try {
      await blogService.remove(id)
      setBlogs(blogs.filter(b => b.id !== id))
    } catch (exception) {
      showNotification(['ERROR', `Problem: ${exception}`])
    }
  }

  const blogList = () => (
    blogs.map(blog => <Blog
      key={blog.id}
      blog={blog}
      blogLike={() => { likeABlog(blog.id) }}
      blogRemove={() => { removeBlog(blog.id) }}
      currentUser={user}
    />)
  )

  return (
    <>
      <Notification status={messageStatusAndText[0]} message={messageStatusAndText[1]} />

      {user === null ?
        <div>
          <Togglable buttonLabel='login'>
            <LoginForm validateLogin={handleLogin} />
          </Togglable>
        </div> :
        <div>
          <h2>blogs</h2>
          <p style={{ fontSize: '1.2em' }}>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
          <Togglable buttonLabel='create new blog' ref={blogFormRef}>
            <NewBlogForm createBlog={addBlog} />
          </Togglable>
          <br />
          {blogList()}
        </div>
      }
    </>
  )
}

export default App
