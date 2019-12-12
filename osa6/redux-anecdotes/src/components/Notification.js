import React from 'react'
import { connect } from 'react-redux'

const Notification = props => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    display: props.notification === '' ? 'none' : 'block'
  }
  return (
    <div style={style}>{props.notification ? props.notification : null}</div>
  )
}

const mapStateToProps = state => {
  // joskus on hyödyllistä tulostaa mapStateToProps:ista...
  console.log(state)
  return {
    notification: state.notification
  }
}
export default connect(mapStateToProps)(Notification)
