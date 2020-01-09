import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { setUser } from '../reducers/userReducer'

import { Button, Menu } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'

const NavMenu = props => {
  const logoutButton = () => (
    <Button
      secondary
      onClick={() => {
        window.localStorage.removeItem('loggedBlogAppUser')
        props.setUser(null)
        props.history.push('/')
      }}
    >
      logout
    </Button>
  )
  return (
    <Menu compact>
      <Menu.Item>
        <Link to="/blogs">blogs</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/users">users</Link>
      </Menu.Item>
      <Menu.Item> {props.user.name} logged in </Menu.Item>
      <Menu.Item>{logoutButton()}</Menu.Item>
    </Menu>
  )
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, { setUser })(withRouter(NavMenu))
