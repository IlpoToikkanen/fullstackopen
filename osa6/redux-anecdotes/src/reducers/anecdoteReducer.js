import anecdoteService from '../services/anecdotes'

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    })
  }
}

export const addVote = anecdote => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.vote(anecdote)
    dispatch({
      type: 'ADD_VOTE',
      updatedAnecdote
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'ADD_VOTE':
      return state.map(anecdote =>
        anecdote.id !== action.updatedAnecdote.id
          ? anecdote
          : action.updatedAnecdote
      )
    case 'INIT_ANECDOTES':
      return action.data
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    default:
      return state
  }
}

export default anecdoteReducer
