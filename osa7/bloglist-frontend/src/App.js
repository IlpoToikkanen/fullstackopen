import React, { useState, useEffect } from 'react'
import { useField } from './hooks/index'
import blogService from './services/blogs'
import loginService from './services/login'
import Blog from './components/Blog'
import LoginView from './components/LoginView'
import LoggedView from './components/LoggedView'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const username = useField('text')
  const password = useField('password')
  const [user, setUser] = useState(null)

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const [notificationInformation, setNotificationInformation] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const initialBlogs = await blogService.getAll()
        console.log(initialBlogs)
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
      console.log(user.token)
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
      setNotificationInformation({
        text: `wrong username or password - ${exception}`,
        type: 'error'
      })
      setTimeout(() => setNotificationInformation(null), 4000)
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
      setNotificationInformation({
        text: `a new blog ${response.title} by ${response.author} added!`,
        type: 'notification'
      })
      setTimeout(() => setNotificationInformation(null), 4000)
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (exception) {
      setNotificationInformation({
        text: `${exception}, blogin lisäys`,
        type: 'error'
      })
      setTimeout(() => setNotificationInformation(null), 4000)
    }
  }

  /*const handleUsernameChange = event => {
    setUsername(event.target.value)
  }
  const handlePasswordChange = event => {
    setPassword(event.target.value)
  }*/

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
      <Notification information={notificationInformation} />
      <LoginView
        username={username}
        password={password}
        /*handleUsernameChange={handleUsernameChange}
        handlePasswordChange={handlePasswordChange}*/
        handleLogin={handleLogin}
      />
    </>
  )

  const loggedView = () => (
    <>
      <h2>blogs</h2>
      <Notification information={notificationInformation} />
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

export default App
