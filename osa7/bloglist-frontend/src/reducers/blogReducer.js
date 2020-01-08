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
  return async dispatch => {
    const likedB = await blogService.like(id, blog)

    dispatch({
      type: 'LIKE_BLOG',
      data: { id, likedB }
    })
  }
}

export const commentBlog = (id, comment) => {
  return async dispatch => {
    const commentedBlog = await blogService.comment(id, comment)
    dispatch({
      type: 'COMMENT_BLOG',
      data: { id, commentedBlog }
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
      return state.map(blog =>
        blog.id === action.data.id ? action.data.likedB : blog
      )
    case 'COMMENT_BLOG':
      return state.map(blog =>
        blog.id === action.data.id ? action.data.commentedBlog : blog
      )
    default:
      return state
  }
}

export default blogReducer
