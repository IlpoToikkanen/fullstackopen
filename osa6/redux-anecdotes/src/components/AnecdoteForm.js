import React from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer'
import {
  setNotification,
  resetNotification
} from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const AnecdoteForm = props => {
  const addAnecdote = event => {
    event.preventDefault()
    const content = event.target.anecdote.value
    props.createAnecdote(content)
    event.target.anecdote.value = ''
    props.setNotification(`anecdote created: ${content}`)
    setTimeout(() => {
      props.resetNotification()
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
const mapDispatchToProps = {
  createAnecdote,
  setNotification,
  resetNotification
}

export default connect(null, mapDispatchToProps)(AnecdoteForm)
