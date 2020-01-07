import React from 'react'

const UserView = ({ user }) => {
  if (user === undefined) {
    return null
  }
  const blogList = user.blogs.map(blog => {
    return <li key={blog.id}>{blog.title}</li>
  })
  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>{blogList}</ul>
    </div>
  )
}

export default UserView
