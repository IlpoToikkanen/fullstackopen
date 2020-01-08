import React from 'react'
import PropTypes from 'prop-types'

import { Button, Form } from 'semantic-ui-react'

const NewBlogForm = ({
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
        <Form onSubmit={addBlog}>
          <Form.Field>
            <label>title: </label>
            <input
              type="text"
              value={title}
              name="Title"
              onChange={handleTitleChange}
            />
          </Form.Field>
          <Form.Field>
            <label>author: </label>
            <input
              type="text"
              value={author}
              name="Author"
              onChange={handleAuthorChange}
            />
          </Form.Field>
          <Form.Field>
            <label>url: </label>
            <input
              type="text"
              value={url}
              name="Url"
              onChange={handleUrlChange}
            />
          </Form.Field>
          <Button primary /*style={{ padding:  }}*/ type="submit">
            create
          </Button>
        </Form>
      </div>
    </>
  )
}

NewBlogForm.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  addBlog: PropTypes.func.isRequired,
  handleTitleChange: PropTypes.func.isRequired,
  handleAuthorChange: PropTypes.func.isRequired,
  handleUrlChange: PropTypes.func.isRequired
}

export default NewBlogForm
