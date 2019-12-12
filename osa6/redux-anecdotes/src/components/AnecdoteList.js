import React from 'react'
import { addVote } from '../reducers/anecdoteReducer'
import {
  setNotification,
  resetNotification
} from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const AnecdoteList = props => {
  const vote = id => {
    console.log('vote', id)
    props.addVote(id)
    props.setNotification(
      `you voted: '${props.anecdotesToShow.find(a => a.id === id).content}'`
    )

    setTimeout(() => {
      props.resetNotification()
    }, 5000)
  }

  return (
    <>
      {props.anecdotesToShow.map(anecdote => (
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

const filteredAnecdotes = ({ anecdotes, filter }) => {
  const sortedAnecdotes = anecdotes.sort((a, b) => b.votes - a.votes)
  return filter !== ''
    ? sortedAnecdotes.filter(anecdote =>
        anecdote.content.toUpperCase().includes(filter.toUpperCase())
      )
    : sortedAnecdotes
}

const mapStateToProps = state => {
  // joskus on hyödyllistä tulostaa mapStateToProps:ista...
  console.log(state)
  return {
    anecdotesToShow: filteredAnecdotes(state)
  }
}
const mapDispatchToProps = {
  addVote,
  setNotification,
  resetNotification
}

const ConnectedAnecdotes = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)
export default ConnectedAnecdotes
