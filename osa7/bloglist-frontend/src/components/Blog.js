import React, { useState } from 'react'
//import blogService from '../services/blogs'
import tokenParser from '../utils/tokenParser'

const Blog = ({ blog, delBlog, likeBlog, user }) => {
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

  const remove = async () => {
    if (window.confirm(`remove blog ${blog.title} by ${blog.author} ?`)) {
      try {
        delBlog(blog.id)
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

  const like = async () => {
    const likedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1
    }
    try {
      likeBlog(blog.id, likedBlog)
    } catch (exception) {
      console.log(exception, 'like')
    }
  }

  return (
    <div style={blogStyle} className="blog">
      <div
        onClick={() => setVisible(visible ? false : true)}
        className="smallView"
      >
        {blog.title} {blog.author}
      </div>
      <div style={extendedBlog} className="extendedView">
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
