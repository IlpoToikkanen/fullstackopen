import blogService from '../services/blogs'

export const initializeAnecdotes = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

const blogReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'INIT_BLOGS':
      return action.data
    default:
      return state
  }
}

export default blogReducer
