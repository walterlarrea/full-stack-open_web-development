const supertest = require('supertest')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash(helper.initialUsers[0].password, 10)
  const user = new User({ username: helper.initialUsers[0].username, passwordHash })

  await user.save()
  const users = await helper.usersInDb()

  const blogsObject = helper.initialBlogs
    .map(blog => {
      blog.user = mongoose.Types.ObjectId(users[0].id)
      return new Blog(blog)
    })
  const blogPromiseArray = blogsObject.map(blog => blog.save())
  await Promise.all(blogPromiseArray)
})

describe('when there is initialy some blogs saved', () => {
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

describe('addition of a new blog', () => {
  test('succeeds with valid data', async () => {
    const newBlog = {
      title: 'We can test POST methods using Jest',
      author: 'Walter',
      url: 'no url at the time',
      user: User.find({ username: 'root' }).id,
      likes: 0
    }

    const loginResponse = await api
      .post('/api/login')
      .send(helper.initialUsers[0])

    await api
      .post('/api/blogs')
      .set('Authorization', 'bearer ' + loginResponse.body.token)
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

  test('succeeds without "likes" property', async () => {
    const newBlog = {
      title: 'If we create a blog without "likes" it will be saved with 0 likes',
      author: 'Walter',
      url: 'no url at the time'
    }

    const loginResponse = await api
      .post('/api/login')
      .send(helper.initialUsers[0])

    await api
      .post('/api/blogs')
      .set('Authorization', 'bearer ' + loginResponse.body.token)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()

    const blogWithoutLikes = blogsAtEnd.find(b => b.title === 'If we create a blog without "likes" it will be saved with 0 likes')
    expect(blogWithoutLikes.likes).toBeDefined()
  })

  test('fails with status code of 400 if data blog is invalid', async () => {
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

    const loginResponse = await api
      .post('/api/login')
      .send(helper.initialUsers[0])


    const blogObject = newBlogs
      .map(blog => new Blog(blog))
    const promiseArray = blogObject.map(blog => api
      .post('/api/blogs')
      .set('Authorization', 'bearer ' + loginResponse.body.token)
      .send(blog)
      .expect(400))
    await Promise.all(promiseArray)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })

  test('fails with status code of 401 if token is missing', async () => {
    const newBlog = {
      title: 'If we create a blog without and authorization token',
      author: 'Walter',
      url: 'no url at the time'
    }

    // const loginResponse = await api
    //   .post('/api/login')
    //   .send(helper.initialUsers[0])

    await api
      .post('/api/blogs')
      //.set('Authorization', 'bearer ' + loginResponse.body.token)
      .send(newBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()

    //const blogWithoutLikes = blogsAtEnd.find(b => b.title === 'If we create a blog without and authorization token')
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })
})

describe('modifying a blog', () => {
  test('succeeds with status code of 200 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send({ ...blogToUpdate, likes: blogToUpdate.likes + 1 })
      .expect(200)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd[0].likes).not.toEqual(blogsAtStart[0].likes)
  })
})

describe('deletion of a blog', () => {
  test('succeeds with status code of 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    const loginResponse = await api
      .post('/api/login')
      .send(helper.initialUsers[0])

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', 'bearer ' + loginResponse.body.token)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length - 1
    )

    const titles = blogsAtEnd.map(r => r.ttile)

    expect(titles).not.toContain(blogToDelete.title)
  })
})

afterAll(() => {
  mongoose.connection.close()
})