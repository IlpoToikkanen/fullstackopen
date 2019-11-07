import React from 'react'
import PropTypes from 'prop-types'

const LoggedView = ({
  title,
  author,
  url,
  addBlog,
  handleTitleChange,
  handleAuthorChange,
  handleUrlChange
}) => {
  return (
    <>
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
    </>
  )
}

LoggedView.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  addBlog: PropTypes.func.isRequired,
  handleTitleChange: PropTypes.func.isRequired,
  handleAuthorChange: PropTypes.func.isRequired,
  handleUrlChange: PropTypes.func.isRequired
}

export default LoggedView
