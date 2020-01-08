import React from 'react'

import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { Table } from 'semantic-ui-react'

const UserList = props => {
  const userTable = props.users.map(user => {
    return (
      <Table.Row key={user.id}>
        <Table.Cell>
          <Link to={`/users/${user.id}`}> {user.name} </Link>
        </Table.Cell>
        <Table.Cell>{user.blogs.length}</Table.Cell>
      </Table.Row>
    )
  })

  return (
    <div>
      <h2>Users</h2>
      <Table striped celled>
        <thead>
          <Table.Row>
            <Table.Cell>
              <strong>User</strong>
            </Table.Cell>
            <Table.Cell>
              <strong>blogs created</strong>
            </Table.Cell>
          </Table.Row>
        </thead>
        <Table.Body>{userTable}</Table.Body>
      </Table>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    users: state.users
  }
}
export default connect(mapStateToProps)(UserList)
