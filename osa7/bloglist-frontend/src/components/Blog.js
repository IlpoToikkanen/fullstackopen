import React from 'react'
import { Link } from 'react-router-dom'
import { List } from 'semantic-ui-react'

const Blog = ({ blog }) => {
  return (
    <List.Item>
      <Link to={`/blogs/${blog.id}`}>
        {blog.title} by {blog.author}
      </Link>
    </List.Item>
  )
}

export default Blog
