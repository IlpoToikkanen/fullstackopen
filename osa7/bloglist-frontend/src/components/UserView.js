import React from 'react'

import { Link } from 'react-router-dom'

import { List, Header } from 'semantic-ui-react'

const UserView = ({ user }) => {
  if (user === undefined) {
    return null
  }
  const blogList = user.blogs.map(blog => {
    return (
      <List.Item key={blog.id}>
        <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
      </List.Item>
    )
  })
  return (
    <div>
      <Header style={{ padding: '10px 0 0 0' }} as="h2">
        User: {user.name}
      </Header>
      <Header as="h3">added blogs</Header>
      <List selection divided verticalAlign="middle">
        {blogList}
      </List>
    </div>
  )
}

export default UserView
