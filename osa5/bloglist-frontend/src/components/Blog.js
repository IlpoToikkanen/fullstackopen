import React, { useState } from 'react'
import blogService from '../services/blogs'
import tokenParser from '../utils/tokenParser'

const Blog = ({ blog, blogs, setBlogs, user }) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const extendedBlog = { display: visible ? '' : 'none' }
  const url = () => {
    if (blog.url.includes('https://')) {
      return blog.url
    }
    return `https://${blog.url}`
  }

  const like = async () => {
    const likedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1
    }
    try {
      await blogService.likeBlog(blog.id, likedBlog)
      setBlogs(
        blogs.map(originalBlog =>
          originalBlog.id !== blog.id
            ? originalBlog
            : { ...blog, likes: blog.likes + 1 }
        )
      )
    } catch (exception) {
      console.log(exception, 'like')
    }
  }

  const remove = async () => {
    if (window.confirm(`remove blog ${blog.title} by ${blog.author} ?`)) {
      try {
        await blogService.deleteBlog(blog.id)
        setBlogs(blogs.filter(originalBlog => originalBlog.id !== blog.id))
      } catch (exception) {
        console.log(exception, 'poisto')
      }
    }
  }

  const userId = tokenParser(user.token)

  const likeButton = () => <button onClick={() => like()}>like</button>

  const deleteButton = () => {
    if (blog.user.id === userId) {
      return <button onClick={() => remove()}>remove</button>
    }
    return null
  }

  return (
    <div style={blogStyle}>
      <div onClick={() => setVisible(visible ? false : true)}>
        {blog.title} {blog.author}
      </div>
      <div style={extendedBlog}>
        <a href={url()} target="_blank" rel="noopener noreferrer">
          {blog.url}
        </a>
        <p>
          likes: {blog.likes} {likeButton()}
        </p>
        <p>added by {blog.user.name}</p>
        {deleteButton()}
      </div>
    </div>
  )
}

export default Blog
