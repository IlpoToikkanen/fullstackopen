const notificationReducer = (state = { message: null }, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.data
    case 'DELETE_NOTIFICATION':
      return { message: null }
    default:
      return state
  }
}

export const setNotification = (message, category, time) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: {
        message,
        category
      }
    })
    setTimeout(() => {
      dispatch({
        type: 'DELETE_NOTIFICATION'
      })
    }, time * 1000)
  }
}

export default notificationReducer
