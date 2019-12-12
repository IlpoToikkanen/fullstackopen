import React from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer'
import {
  setNotification,
  resetNotification
} from '../reducers/notificationReducer'

const AnecdoteForm = ({ store }) => {
  const addAnecdote = event => {
    event.preventDefault()
    const content = event.target.anecdote.value
    store.dispatch(createAnecdote(content))
    event.target.anecdote.value = ''
    store.dispatch(setNotification(`anecdote created: ${content}`))
    setTimeout(() => {
      store.dispatch(resetNotification())
    }, 5000)
  }

  return (
    <>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button>create</button>
      </form>
    </>
  )
}

export default AnecdoteForm
