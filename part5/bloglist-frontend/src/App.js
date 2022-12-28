import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [messageStatusAndText, setMessageStatusAndText] = useState(["", null]) // ["OK" or "ERROR", "message"]

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const showNotification = ([type, msg]) => {
    setMessageStatusAndText([type, msg])
    setTimeout(() => {
      setMessageStatusAndText(["", null])
    }, 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedBloglistappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      showNotification(['ERROR', 'wrong username or password'])
    }
  }

  const handleLogout = (event) => {
    window.localStorage.removeItem('loggedBloglistappUser')
    window.location.reload()
  }

  const addBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }

    try {
      const response = await blogService.create(blogObject)

      setBlogs(blogs.concat(response))

      showNotification(['OK', `a new blog ${newTitle} by ${newAuthor} added`])

      setNewTitle('')
      setNewAuthor('')
      setNewUrl('')

    } catch {
      showNotification(['ERROR', 'There was a problem, failed to save the new blog'])
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const newBlogForm = () => (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            type="text"
            value={newTitle}
            name="title"
            onChange={({ target }) => setNewTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            value={newAuthor}
            name="author"
            onChange={({ target }) => setNewAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            type="text"
            value={newUrl}
            name="url"
            onChange={({ target }) => setNewUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )

  const blogList = () => (
    blogs.map(blog =>
      <Blog key={blog.id} blog={blog} />
    )
  )

  return (
    user === null ?
      <div>
        <Notification status={messageStatusAndText[0]} message={messageStatusAndText[1]} />
        <h2>log in to application</h2>
        {loginForm()}
      </div> :
      <div>
        <h2>blogs</h2>
        <Notification status={messageStatusAndText[0]} message={messageStatusAndText[1]} />
        <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
        {newBlogForm()}
        <br />
        {blogList()}
      </div>
  )
}

export default App
