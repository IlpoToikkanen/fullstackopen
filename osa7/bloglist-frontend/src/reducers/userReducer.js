import loginService from '../services/login'

export const setUser = user => {
  return dispatch => {
    dispatch({
      type: 'SET_USER',
      data: user
    })
  }
}

const userReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.data
    default:
      return state
  }
}

export default userReducer
