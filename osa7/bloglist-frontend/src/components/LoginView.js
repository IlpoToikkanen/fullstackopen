import React from 'react'
import { useField } from '../hooks/index'
import { connect } from 'react-redux'
import { setUser } from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationReducer'
import loginService from '../services/login'
import blogService from '../services/blogs'
import Notification from './Notification'

import { Button, Form } from 'semantic-ui-react'

const LoginView = props => {
  const username = useField('text')
  const password = useField('password')

  const { reset: _, ...usernameWithoutReset } = username
  const { reset: __, ...passwordWithoutReset } = password

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

  return (
    <>
      <h2>log in to application</h2>
      <Notification />
      <Form style={{ width: '25%' }} onSubmit={handleLogin}>
        <Form.Field>
          <label>username</label>
          <input {...usernameWithoutReset} />
        </Form.Field>
        <Form.Field>
          <label>password</label>
          <input {...passwordWithoutReset} />
        </Form.Field>
        <Button secondary type="submit">
          login
        </Button>
      </Form>
    </>
  )
}

const mapStateToProps = state => {
  return {
    user: state.user,
    notification: state.notification
  }
}

const mapDispatchToProps = {
  setUser,
  setNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginView)
