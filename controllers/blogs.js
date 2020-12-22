const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const { author, url, likes, title } = request.body

  if (!title || !url) {
    return response.status(400).json({
      error: 'Both the title and url must be provided!'
    })
  }
  const blog = new Blog({
    author, url, title, likes: likes || 0
  })
  const result = await blog.save()
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

module.exports = blogsRouter