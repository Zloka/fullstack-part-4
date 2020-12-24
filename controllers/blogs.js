const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const { author, url, likes, title } = request.body
  if (!title || !url) {
    return response.status(400).json({
      error: 'Both the title and url must be provided!'
    })
  }

  const users = await User.find({}) // Assumes at least one user exists!
  const user = users[0]

  const blog = new Blog({
    author, url, title, likes: likes || 0, user: user._id
  })
  const result = await blog.save()

  user.blogs = user.blogs.concat(result._id)
  await user.save()
  response.status(201).json(result)
})

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.put('/:id', (request, response, next) => {
  const { title, author, url, likes } = request.body

  const blog = {
    title, author, url, likes
  }

  Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    .then(updatedBlog => {
      response.json(updatedBlog)
    })
    .catch(error => next(error))
})

module.exports = blogsRouter