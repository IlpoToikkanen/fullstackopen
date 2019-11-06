import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginView from './components/LoginView'
import LoggedView from './components/LoggedView'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [notificationInformation, setNotificationInformation] = useState(null)

  useEffect(() => {
    blogService.getAll().then(initialBlogs => {
      console.log(initialBlogs, 'initial')
      setBlogs(initialBlogs)
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: username,
        password: password
      })
      console.log(user)

      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))
      console.log(user.token)
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotificationInformation({
        text: `wrong username or password - ${exception}`,
        type: 'error'
      })
      setTimeout(() => setNotificationInformation(null), 4000)
    }
  }

  const addBlog = async event => {
    event.preventDefault()
    const newBlog = {
      title: title,
      author: author,
      url: url
    }
    try {
      const response = await blogService.create(newBlog)
      console.log(response)
      setBlogs(blogs.concat(response))
      setNotificationInformation({
        text: `a new blog ${response.title} by ${response.author} added!`,
        type: 'notification'
      })
      setTimeout(() => setNotificationInformation(null), 4000)
    } catch (exception) {
      setNotificationInformation({
        text: exception,
        type: 'error'
      })
      setTimeout(() => setNotificationInformation(null), 4000)
    }
  }

  const handleUsernameChange = event => {
    setUsername(event.target.value)
  }
  const handlePasswordChange = event => {
    setPassword(event.target.value)
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

  return (
    <>
      <div>
        {user === null ? (
          <>
            <h2>log in to application</h2>
            <Notification information={notificationInformation} />
            <LoginView
              username={username}
              password={password}
              handleUsernameChange={handleUsernameChange}
              handlePasswordChange={handlePasswordChange}
              handleLogin={handleLogin}
            />
          </>
        ) : (
          <>
            <h2>blogs</h2>
            <Notification information={notificationInformation} />
            <LoggedView
              user={user}
              title={title}
              author={author}
              url={url}
              blogs={blogs}
              addBlog={addBlog}
              setUser={setUser}
              handleTitleChange={handleTitleChange}
              handleAuthorChange={handleAuthorChange}
              handleUrlChange={handleUrlChange}
            />
          </>
        )}
      </div>
    </>
  )
}

export default App
