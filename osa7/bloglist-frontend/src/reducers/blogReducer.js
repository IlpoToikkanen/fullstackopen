import blogService from '../services/blogs'

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const addBlog = newBlog => {
  return async dispatch => {
    const addedBlog = await blogService.create(newBlog)
    dispatch({
      type: 'ADD_BLOG',
      data: addedBlog
    })
  }
}

export const delBlog = id => {
  return async dispatch => {
    await blogService.deleteBlog(id)
    dispatch({
      type: 'DEL_BLOG',
      id
    })
  }
}

export const likeBlog = (id, blog) => {
  console.log(id, blog)
  return async dispatch => {
    console.log('here')
    const likedBlog = await blogService.like(id, blog)
    dispatch({
      type: 'LIKE_BLOG',
      data: { id, likedBlog }
    })
  }
}

const blogReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'INIT_BLOGS':
      return action.data
    case 'ADD_BLOG':
      return state.concat(action.data)
    case 'DEL_BLOG':
      return state.filter(originalBlog => originalBlog.id !== action.id)
    case 'LIKE_BLOG':
      console.log('täällä')
      return state.map(originalBlog =>
        originalBlog.id !== action.id ? originalBlog : action.data.likedBlog
      )
    default:
      return state
  }
}

export default blogReducer
