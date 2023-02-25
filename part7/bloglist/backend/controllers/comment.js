const commentsRouter = require('express').Router()
const Comment = require('../models/comment')
const Blog = require('../models/blog')

commentsRouter.get('/', async (req, res) => {
  const comments = await Comment.find({})
    .populate('blog', { id: 1 })

  res.json(comments)
})

commentsRouter.post('/', async (req, res) => {
  const body = req.body

  if (!body.blog) {
    return res.status(401).json({ error: 'target blog missing or invalid' })
  }
  // didn't want to make a DB query inside the middleware
  const blog = await Blog.findById(body.blog)

  const comment = new Comment({
    content: body.content,
    blog: blog._id
  })

  const savedComment = await comment.save()
  blog.comments = blog.comments.concat(savedComment.id)
  blog.save()

  res.status(201).json(savedComment)
})

module.exports = commentsRouter