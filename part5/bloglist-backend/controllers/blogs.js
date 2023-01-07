const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
//const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 })

  res.json(blogs)
})

blogsRouter.post('/', async (req, res) => {
  const body = req.body
  if (!req.user?.id) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }
  // didn't want to make a DB query inside the middleware
  const user = await User.findById(req.user.id)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    user: user._id,
    likes: body.likes || 0
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog.id)
  user.save()

  res.status(201).json(savedBlog)
})

blogsRouter.put('/:id', async (req, res) => {
  const { likes } = req.body

  const updatedBlog = await Blog.findByIdAndUpdate(
    req.params.id,
    { likes },
    { new: true, runValidators: true, context: 'query' }
  )

  res.json(updatedBlog)
})

blogsRouter.delete('/:id', async (req, res) => {
  if (!req.user.id) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(req.user.id)

  const blogToDelete = await Blog
    .findById(req.params.id)
  //.populate('user', { username: 1, user: 1 })
  if (!blogToDelete) {
    return res.status(400).json({ error: 'the requested blog has already been removed' })
  }
  if (blogToDelete.user.toString() !== user.id.toString()) {
    return res.status(403).json({ error: 'only the user who created a blog is able to delete it' })
  }

  await Blog.findByIdAndRemove(req.params.id)
  res.status(204).end()
})

module.exports = blogsRouter