const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const blog1 = {
  title: 'Test Title 1',
  author: 'Test Author 1',
  url: 'http://www.test.url/1',
  likes: 1,
}

const blog2 = {
  title: 'Test Title 2',
  author: 'Test Author 2',
  url: 'http://www.test.url/2',
  likes: 2,
}
const initialBlogs = [
  blog1,
  blog2
]

const api = supertest(app)

describe('blog api', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObjects = initialBlogs
      .map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
  })

  test('should return the correct amount of blogs', async () => {
    const response = await api.get('/api/Blogs')

    expect(response.body).toHaveLength(2)
  })

  test('should have a property called id for each blog', async () => {
    const response = await api.get('/api/Blogs')

    response.body.forEach(responseBlog => {
      expect(responseBlog.id).toBeDefined()
    })
  })

  test('should add a blog when sending a correctly formed POST-request', async () => {
    const newBlog = {
      title: 'Test Title 3',
      author: 'Test Author 3',
      url: 'http://www.test.url/3',
      likes: 3,
    }
    await api.post('/api/Blogs').send(newBlog)
    const response = await api.get('/api/Blogs')
    expect(response.body).toHaveLength(3)
  })

  test('should default to 0 likes if no likes are provided', async () => {
    const newBlog = {
      title: 'Test Title 3',
      author: 'Test Author 3',
      url: 'http://www.test.url/3',
    }
    await api.post('/api/Blogs').send(newBlog)
    const response = await api.get('/api/Blogs')
    response.body.forEach(responseBlog => {
      expect(responseBlog.likes).toBeGreaterThanOrEqual(0)
    })
  })

  test('should respond with a 400 status code if title or url is missing', async () => {
    const newBlog = {
      author: 'Test Author 3',
      url: 'http://www.test.url/3',
    }

    await api
      .post('/api/Blogs').send(newBlog)
      .expect(400)

    newBlog.title = 'some title'
    delete newBlog.url

    await api
      .post('/api/Blogs').send(newBlog)
      .expect(400)
  })


  afterAll(() => {
    mongoose.connection.close()
  })
})