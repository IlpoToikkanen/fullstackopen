const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body

  if (!body.title) {
    return response.status(400).json({
      error: 'title missing'
    })
  } else if (!body.url) {
    return response.status(400).json({
      error: 'url missing'
    })
  }

  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(decodedToken.id)
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes === undefined ? 0 : body.likes,
      user: user._id,
      comments: []
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog.toJSON())
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  if (!(await Blog.find({ id: request.params._id }))) {
    response.status(400).json({ error: 'nothing to delete' })
  }
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(decodedToken.id)
    const blog = await Blog.findById(request.params.id)

    if (blog.user.toString() !== user.id.toString()) {
      response.status(400).json({ error: 'invalid ownership of blog' })
    }
    await Blog.findByIdAndRemove(request.params.id)
    return response.status(204).end()
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    comments: body.comments
  }
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
      new: true
    }).populate('user')
    response.json(updatedBlog.toJSON())
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.post('/:id/comments', async (request, response, next) => {
  const newComment = request.body.value
  console.log(request.body)

  try {
    console.log('täällä')
    const origBlog = await Blog.findById(request.params.id)
    const blogWithComment = {
      title: origBlog.title,
      author: origBlog.author,
      url: origBlog.url,
      likes: origBlog.likes,
      comments: origBlog.comments.concat(newComment)
    }
    console.log(origBlog)
    console.log(blogWithComment)
    const commentedBlog = await Blog.findByIdAndUpdate(
      request.params.id,
      blogWithComment,
      { new: true }
    )
    response.json(commentedBlog.toJSON())
  } catch (exception) {
    next(exception)
  }
})

module.exports = blogsRouter
