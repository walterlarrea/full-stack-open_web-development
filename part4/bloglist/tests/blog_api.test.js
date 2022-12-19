const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObject = helper.initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObject.map(blog => blog.save())
  await Promise.all(promiseArray)
})

describe('blogs api - list blogs', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('unique identifier of blogs is named "id"', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
  })
})

describe('blogs api - save blogs', () => {
  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'We can test POST methods using Jest',
      author: 'Walter',
      url: 'no url at the time',
      likes: 0
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(b => b.title)
    expect(titles).toContain(
      'We can test POST methods using Jest'
    )
  })

  test('a blog without "likes" property will be saved with 0 likes', async () => {
    const newBlog = {
      title: 'If we create a blog without "likes" it will be saved with 0 likes',
      author: 'Walter',
      url: 'no url at the time'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()

    const blogWithoutLikes = blogsAtEnd.find(b => b.title === 'If we create a blog without "likes" it will be saved with 0 likes')
    expect(blogWithoutLikes.likes).toBeDefined()
  })

  test('creating blogs with "title" or "url" missing will get "400 Bad Request" response', async () => {
    const newBlogs = [{
      title: 'This blog does not have a url',
      author: 'Walter',
      likes: 5
    },
    {
      author: 'Walter',
      url: 'this blog does not have a title',
      likes: 5
    }]

    const blogObject = newBlogs
      .map(blog => new Blog(blog))
    const promiseArray = blogObject.map(blog => api
      .post('/api/blogs')
      .send(blog)
      .expect(400))
    await Promise.all(promiseArray)
    // await api
    //   .post('/api/blogs')
    //   .send(newBlogs[0])
    //   .expect(400)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})