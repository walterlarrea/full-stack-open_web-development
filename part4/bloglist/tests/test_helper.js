const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'First title',
    author: 'First author',
    url: 'First no url',
    likes: 99
  },
  {
    title: 'Second title',
    author: 'Second author',
    url: 'Second no url',
    likes: 1
  }
]

const initialUsers = [
  {
    username: 'root',
    password: 'sekret'
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs,
  initialUsers,
  blogsInDb,
  usersInDb
}