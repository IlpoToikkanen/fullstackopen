import React, { useState, useEffect } from 'react'
import { useField } from './hooks/index'
import { connect } from 'react-redux'
import blogService from './services/blogs'
import loginService from './services/login'
import Blog from './components/Blog'
import LoginView from './components/LoginView'
import LoggedView from './components/LoggedView'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import UserList from './components/UserList'
import UserView from './components/UserView'
import { setNotification } from './reducers/notificationReducer'
import {
  initializeBlogs,
  addBlog,
  likeBlog,
  delBlog
} from './reducers/blogReducer'
import { setUser } from './reducers/userReducer'
import { initializeUsers } from './reducers/usersReducer'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom'

const App = props => {
  const username = useField('text')
  const password = useField('password')

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      if (props.user) {
        props.initializeBlogs()
      }
      props.initializeUsers()
    }
    fetchData()
  }, [props.user])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      props.setUser(user)
    }
  }, [])

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: username.value,
        password: password.value
      })

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))

      blogService.setToken(user.token)
      props.setUser(user)
      username.reset()
      password.reset()
    } catch (exception) {
      props.setNotification(
        `wrong username or password - ${exception}`,
        'error',
        4
      )
    }
  }
  const loggedViewRef = React.createRef()

  const addBlog = async event => {
    event.preventDefault()
    loggedViewRef.current.toggleVisibility()
    const newBlog = {
      title: title,
      author: author,
      url: url
    }
    try {
      props.addBlog(newBlog)
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
  const rows = () =>
    sortedBlogs.map(blog => (
      <Blog
        key={blog.id}
        blog={blog}
        blogs={props.blogs}
        delBlog={props.delBlog}
        user={props.user}
        likeBlog={props.likeBlog}
      />
    ))

  const loginView = () => (
    <>
      <h2>log in to application</h2>
      <Notification />
      <LoginView
        username={username}
        password={password}
        handleLogin={handleLogin}
      />
    </>
  )

  const loggedView = () => (
    <>
      <h2>blogs</h2>
      <Notification />
      <p>
        {props.user.name} logged in {logoutButton()}
      </p>
      <Togglable buttonLabel="new blog" ref={loggedViewRef}>
        <>
          <LoggedView
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
      {rows()}
    </>
  )
  const logoutButton = () => (
    <button
      onClick={() => {
        window.localStorage.removeItem('loggedBlogAppUser')
        props.setUser(null)
      }}
    >
      logout
    </button>
  )

  const userById = id => props.users.find(user => user.id === id)

  return (
    <div>
      <Router>
        <div>
          {props.user === null ? <>{loginView()}</> : <>{loggedView()}</>}
        </div>
        <Route exact path="/users" render={() => <UserList />} />
        <Route
          exact
          path="/users/:id"
          render={({ match }) => <UserView user={userById(match.params.id)} />}
        />
      </Router>
    </div>
  )
}

const mapStateToProps = state => {
  console.log(state)
  return {
    blogs: state.blogs,
    user: state.user,
    users: state.users
  }
}

const mapDispatchToProps = {
  setUser,
  initializeBlogs,
  addBlog,
  likeBlog,
  delBlog,
  setNotification,
  initializeUsers
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
