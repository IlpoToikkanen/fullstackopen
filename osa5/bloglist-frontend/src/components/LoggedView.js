import React from 'react'
import Blog from './Blog'

const LoggedView = ({
  user,
  title,
  author,
  url,
  blogs,
  addBlog,
  setUser,
  handleTitleChange,
  handleAuthorChange,
  handleUrlChange
}) => {
  const rows = () => blogs.map(blog => <Blog key={blog.id} blog={blog} />)

  return (
    <>
      <p>
        {user.name} logged in{' '}
        <button
          onClick={() => {
            window.localStorage.removeItem('loggedNoteappUser')
            setUser(null)
          }}
        >
          logout
        </button>
      </p>
      <h2>create new</h2>
      <div>
        <form onSubmit={addBlog}>
          <div>
            title:{' '}
            <input
              type="text"
              value={title}
              name="Title"
              onChange={handleTitleChange}
            />
          </div>
          <div>
            author:{' '}
            <input
              type="text"
              value={author}
              name="Author"
              onChange={handleAuthorChange}
            />
          </div>
          <div>
            url:{' '}
            <input
              type="text"
              value={url}
              name="Url"
              onChange={handleUrlChange}
            />
          </div>
          <button type="submit">create</button>
        </form>
      </div>
      {rows()}
    </>
  )
}

export default LoggedView
