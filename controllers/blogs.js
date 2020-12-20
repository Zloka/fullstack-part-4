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

module.exports = blogsRouter