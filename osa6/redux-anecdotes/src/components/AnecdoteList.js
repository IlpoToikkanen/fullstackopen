import React from 'react'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const AnecdoteList = props => {
  const vote = anecdote => {
    console.log('vote', anecdote.id)
    props.addVote(anecdote)
    props.setNotification(
      `you voted: '${
        props.anecdotesToShow.find(a => a.id === anecdote.id).content
      }'`,
      5
    )
  }

  return (
    <>
      {props.anecdotesToShow.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}{' '}
    </>
  )
}

const filteredAnecdotes = ({ anecdotes, filter }) => {
  const sortedAnecdotes = anecdotes.sort((a, b) => b.votes - a.votes)
  return filter !== ''
    ? sortedAnecdotes.filter(anecdote =>
        anecdote.content.toUpperCase().includes(filter.toUpperCase())
      )
    : sortedAnecdotes
}

const mapStateToProps = state => {
  return {
    anecdotesToShow: filteredAnecdotes(state)
  }
}
const mapDispatchToProps = {
  addVote,
  setNotification
}

const ConnectedAnecdotes = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)
export default ConnectedAnecdotes
