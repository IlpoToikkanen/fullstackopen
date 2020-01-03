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
import { setNotification } from './reducers/notificationReducer'

const App = props => {
  const [blogs, setBlogs] = useState([])

  const username = useField('text')
  const password = useField('password')
  const [user, setUser] = useState(null)

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const initialBlogs = await blogService.getAll()
        setBlogs(initialBlogs)
      }
    }
    fetchData()
  }, [user])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      setUser(user)
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
      setUser(user)
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
      const response = await blogService.create(newBlog)

      setBlogs(blogs.concat(response))
      props.setNotification(
        `a new blog ${response.title} by ${response.author} added!`,
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

  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
  const rows = () =>
    sortedBlogs.map(blog => (
      <Blog
        key={blog.id}
        blog={blog}
        blogs={blogs}
        setBlogs={setBlogs}
        user={user}
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
        {user.name} logged in {logoutButton()}
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
        setUser(null)
      }}
    >
      logout
    </button>
  )

  return (
    <>
      <div>{user === null ? <>{loginView()}</> : <>{loggedView()}</>}</div>
    </>
  )
}

const mapStateToProps = state => {
  console.log(state)
  return {
    blogs: state.blogs
  }
}

export default connect(mapStateToProps, { setNotification })(App)
