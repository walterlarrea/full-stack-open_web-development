const Blog = require('../models/blog')

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

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs,
  blogsInDb
}