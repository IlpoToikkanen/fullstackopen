const Blog = require('../models/blog')
const User = require('../models/user')
const initialBlogs = [
  {
    title: 'Timon syntymäpäivät',
    author: 'Ilpo',
    url: 'www.fullstackopen.com',
    likes: 5
  },
  {
    title: 'Timon viiskymppiset',
    author: 'Ilpo',
    url: 'www.fullstackopen.com',
    likes: 3
  },
  {
    title: 'Timon hautajaiset',
    author: 'Ilpo',
    url: 'www.fullstackopen.com',
    likes: 20
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}
const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs,
  blogsInDb,
  usersInDb
}
