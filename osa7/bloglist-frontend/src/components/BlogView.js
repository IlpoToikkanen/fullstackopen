import React from 'react'
import tokenParser from '../utils/tokenParser'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'

import { likeBlog, delBlog, commentBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { initializeUsers } from '../reducers/usersReducer'

import { useField } from '../hooks/index'

import { Form, Button } from 'semantic-ui-react'

const BlogView = props => {
  const comment = useField('text')

  const { reset: _, ...commentWithoutReset } = comment

  if (props.user === null || props.blog === undefined) {
    return null
  }

  const blog = props.blog
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
      likes: blog.likes + 1,
      comments: blog.comments
    }
    try {
      props.likeBlog(blog.id, likedBlog)
    } catch (exception) {
      console.log(exception, 'like')
    }
  }

  const remove = async () => {
    if (window.confirm(`remove blog ${blog.title} by ${blog.author} ?`)) {
      try {
        await props.delBlog(blog.id)
        props.initializeUsers()
        console.log(props.users)
        props.setNotification(
          `blog ${blog.title} by ${blog.author} deleted!`,
          'notification',
          4
        )
        props.history.push('/')
      } catch (exception) {
        console.log(exception, 'poisto')
      }
    }
  }

  const deleteButton = () => {
    if (blog.user.id === userId) {
      return (
        <Button color="purple" size="mini" onClick={() => remove()}>
          remove
        </Button>
      )
    }
    return null
  }

  const userId = tokenParser(props.user.token)

  const likeButton = () => <Button onClick={() => like()}>like</Button>

  const commentList =
    blog.comments.length === 0
      ? null
      : blog.comments.map(comment => <li key={comment}>{comment}</li>)

  const addComment = () => {
    props.commentBlog(blog.id, comment)
    comment.reset()
  }

  return (
    <>
      <div>
        <h2>
          {blog.title} by {blog.author}
        </h2>
        <a href={url()} target="_blank" rel="noopener noreferrer">
          {blog.url}
        </a>
        <p>
          likes: {blog.likes} {likeButton()}
        </p>
        <p>
          added by <Link to={`/users/${blog.user.id}`}>{blog.user.name}</Link>
        </p>
        {deleteButton()}
      </div>
      <div>
        <h3>comments</h3>
        <Form style={{ width: '40%' }} onSubmit={() => addComment()}>
          <input {...commentWithoutReset} />
          <Button primary type="submit">
            add comment
          </Button>
        </Form>
        <ul>{commentList}</ul>
      </div>
    </>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user,
    notification: state.notification,
    blog: ownProps.blog,
    users: state.users
  }
}

const mapDispatchToProps = {
  setNotification,
  likeBlog,
  delBlog,
  commentBlog,
  initializeUsers
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(BlogView))
