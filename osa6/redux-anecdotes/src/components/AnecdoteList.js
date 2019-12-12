import React from 'react'
import { addVote } from '../reducers/anecdoteReducer'
import {
  setNotification,
  resetNotification
} from '../reducers/notificationReducer'

const AnecdoteList = ({ store }) => {
  const { anecdotes, filter } = store.getState()
  const sortedAnecdotes = anecdotes.sort((a, b) => b.votes - a.votes)
  const filteredAnecdotes =
    filter !== ''
      ? sortedAnecdotes.filter(anecdote =>
          anecdote.content.toUpperCase().includes(filter.toUpperCase())
        )
      : sortedAnecdotes

  const vote = id => {
    console.log('vote', id)
    store.dispatch(addVote(id))
    store.dispatch(
      setNotification(
        `you voted: '${anecdotes.find(a => a.id === id).content}'`
      )
    )
    setTimeout(() => {
      store.dispatch(resetNotification())
    }, 5000)
  }

  return (
    <>
      {filteredAnecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}{' '}
    </>
  )
}

export default AnecdoteList
