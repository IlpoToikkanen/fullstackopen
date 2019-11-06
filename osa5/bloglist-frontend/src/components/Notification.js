import React from 'react'

const Notification = ({ information }) => {
  const notificationStyle = {
    color: 'green',
    border: '2px solid green',
    borderRadius: '5px',
    fontSize: '25px'
  }
  const errorStyle = {
    color: 'red',
    border: '2px solid red',
    borderRadius: '5px',
    fontSize: '25px'
  }
  if (information === null) {
    return null
  }

  return (
    <div
      className="notification"
      style={information.type === 'error' ? errorStyle : notificationStyle}
    >
      {information.text}
    </div>
  )
}

export default Notification
