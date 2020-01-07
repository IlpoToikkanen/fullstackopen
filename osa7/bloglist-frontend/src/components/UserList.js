import React from 'react'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'

const UserList = props => {
  const userTable = props.users.map(user => {
    return (
      <tr key={user.id}>
        <td>
          <Link to={`/users/${user.id}`}> {user.name} </Link>
        </td>
        <td>{user.blogs.length}</td>
      </tr>
    )
  })

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <td></td>
            <td>
              <strong>blogs created</strong>
            </td>
          </tr>
        </thead>
        <tbody>{userTable}</tbody>
      </table>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    users: state.users
  }
}
export default connect(mapStateToProps)(UserList)
