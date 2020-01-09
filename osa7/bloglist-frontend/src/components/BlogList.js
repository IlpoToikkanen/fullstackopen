import React, { useState } from 'react'
import { connect } from 'react-redux'
import { addBlog, initializeBlogs } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { initializeUsers } from '../reducers/usersReducer'
import Togglable from './Togglable'
import NewBlogForm from './NewBlogForm'
import Blog from './Blog'

import { List } from 'semantic-ui-react'

const BlogList = props => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = async event => {
    event.preventDefault()
    loggedViewRef.current.toggleVisibility()
    const newBlog = {
      title: title,
      author: author,
      url: url
    }
    try {
      await props.addBlog(newBlog)
      props.initializeUsers()
      props.initializeBlogs()
      props.setNotification(
        `a new blog ${title} by ${author} added!`,
        'notification',
        4
      )

      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (exception) {
      props.setNotification(`${exception}, blogin lisäys`, 'error', 4)
    }
  }

  const loggedViewRef = React.createRef()

  const handleTitleChange = event => {
    setTitle(event.target.value)
  }
  const handleAuthorChange = event => {
    setAuthor(event.target.value)
  }
  const handleUrlChange = event => {
    setUrl(event.target.value)
  }

  const sortedBlogs = props.blogs.sort((a, b) => b.likes - a.likes)
  const rows = () => sortedBlogs.map(blog => <Blog key={blog.id} blog={blog} />)

  return (
    <>
      <Togglable buttonLabel="new blog" ref={loggedViewRef}>
        <>
          <NewBlogForm
            title={title}
            author={author}
            url={url}
            addBlog={addBlog}
            handleTitleChange={handleTitleChange}
            handleAuthorChange={handleAuthorChange}
            handleUrlChange={handleUrlChange}
          />
        </>
      </Togglable>
      <List bulleted divided relaxed size="large">
        {rows()}
      </List>
    </>
  )
}

const mapStateToProps = state => {
  return {
    blogs: state.blogs
  }
}
export default connect(mapStateToProps, {
  addBlog,
  initializeBlogs,
  setNotification,
  initializeUsers
})(BlogList)
