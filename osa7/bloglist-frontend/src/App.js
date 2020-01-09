import React, { useEffect } from 'react'

import blogService from './services/blogs'

import LoginView from './components/LoginView'
import Notification from './components/Notification'
import UserList from './components/UserList'
import UserView from './components/UserView'
import BlogView from './components/BlogView'
import NavMenu from './components/NavMenu'
import BlogList from './components/BlogList'

import { setNotification } from './reducers/notificationReducer'
import {
  initializeBlogs,
  addBlog,
  likeBlog,
  delBlog
} from './reducers/blogReducer'
import { setUser } from './reducers/userReducer'
import { initializeUsers } from './reducers/usersReducer'

import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'

import { Container, Header } from 'semantic-ui-react'

const App = props => {
  const setUser = props.setUser
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      setUser(user)
    }
  }, [setUser])

  const initializeUsers = props.initializeUsers
  const initializeBlogs = props.initializeBlogs
  const user = props.user
  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        initializeBlogs()
      }
      initializeUsers()
    }
    fetchData()
  }, [user, initializeBlogs, initializeUsers])

  const userById = id => props.users.find(user => user.id === id)
  const blogById = id => props.blogs.find(blog => blog.id === id)

  if (props.user === null) {
    return (
      <Container>
        <Router>
          <LoginView />
        </Router>
      </Container>
    )
  }

  return (
    <Container>
      <Router>
        <NavMenu />
        <Notification />
        <div>
          <Header as="h1" style={{ padding: '10px 10px 10px 0px' }}>
            Blog app
          </Header>
        </div>
        <Route exact path="/" render={() => <BlogList />} />
        <Route exact path="/blogs" render={() => <BlogList />} />

        <Route
          exact
          path="/blogs/:id"
          render={({ match }) =>
            props.blogs ? <BlogView blog={blogById(match.params.id)} /> : null
          }
        />
        <Route exact path="/users" render={() => <UserList />} />
        <Route
          exact
          path="/users/:id"
          render={({ match }) => <UserView user={userById(match.params.id)} />}
        />
      </Router>
    </Container>
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
