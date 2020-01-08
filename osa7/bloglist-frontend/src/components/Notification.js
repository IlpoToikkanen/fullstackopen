import React from 'react'
import { connect } from 'react-redux'

const Notification = props => {
  const notificationStyle = {
    color: props.notification.category === 'error' ? 'red' : 'green',
    border: '2px solid green',
    borderRadius: '5px',
    fontSize: '25px',
    padding: '20px'
  }

  if (props.notification.message === null) {
    return null
  }

  return (
    <div className="notification" style={notificationStyle}>
      {props.notification.message}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    notification: state.notification
  }
}

export default connect(mapStateToProps)(Notification)
