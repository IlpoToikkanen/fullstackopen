const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  let blogObject = new Blog(helper.initialBlogs[0])
  try {
    await blogObject.save()
  } catch (exception) {
    console.log(exception)
  }

  blogObject = new Blog(helper.initialBlogs[1])
  try {
    await blogObject.save()
  } catch (exception) {
    console.log(exception)
  }

  blogObject = new Blog(helper.initialBlogs[2])
  try {
    await blogObject.save()
  } catch (exception) {
    console.log(exception)
  }
})

test('right amount of notes are returned and they are in json', async () => {
  const result = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(result.body.length).toBe(3)
})

test('blog id is defined', async () => {
  const response = await api.get('/api/blogs')

  response.body.forEach(blog => {
    expect(blog.id).toBeDefined()
  })
})

test('a blog can be posted', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const newBlog = new Blog({
    title: 'Timon rippijuhlat',
    author: 'Lauri',
    url: 'fullstackopen.com',
    likes: 4
  })
  await newBlog.save()
  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd.length).toBe(blogsAtStart.length + 1)
  expect(blogsAtEnd[3].title).toEqual(newBlog.title)
})

test('a blog posted without likes gets 0 likes', async () => {
  const newBlog = {
    title: 'Timon rippijuhlat',
    author: 'Lauri',
    url: 'fullstackopen.com'
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd[3].likes).toBe(0)
})

test('a blog posted without title and url is not saved', async () => {
  const blogs = [
    {
      title: 'Pelle',
      author: 'Lauri',
      likes: 5
    },
    {
      author: 'Lauri',
      url: 'www.fullstackopen.com',
      likes: 5
    },
    { author: 'Lauri', likes: 5 }
  ]
  for (let blog of blogs) {
    await api
      .post('/api/blogs')
      .send(blog)
      .expect(400)
  }
})

afterAll(() => {
  mongoose.connection.close()
})
