import React from 'react'
import PropTypes from 'prop-types'

const LoginView = ({ username, password, handleLogin }) => {
  const { reset: _, ...usernameWithoutReset } = username
  const { reset: __, ...passwordWithoutReset } = password

  return (
    <>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input {...usernameWithoutReset} />
        </div>
        <div>
          password
          <input {...passwordWithoutReset} />
        </div>
        <button type="submit">login</button>
      </form>
    </>
  )
}

LoginView.propTypes = {
  username: PropTypes.object.isRequired,
  password: PropTypes.object.isRequired,
  handleLogin: PropTypes.func.isRequired
  /*handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired*/
}

export default LoginView
