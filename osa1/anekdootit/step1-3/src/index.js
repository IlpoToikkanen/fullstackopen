import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(props.anecdotes.length).fill(0))
  const [maxIndex, setIndex] = useState(0)
  
  const handleNextClick = () => {
    setSelected(getRandom(props))
  }

  const handleVoteClick = () => {
    const copy = [...votes]
    console.log(Math.max(...copy))
    if (copy[selected] === Math.max(...copy)) {
      setIndex(selected)
    }
    copy[selected] += 1
    setVotes(copy)
    
  } 

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {props.anecdotes[selected]}
      <p>has {votes[selected]} votes</p>
      <Button onClick={handleVoteClick} text='vote' />
      <Button onClick={handleNextClick} text='next anecdote' />
      <h1>Anecdote with most votes</h1>
      {props.anecdotes[maxIndex]}
      <p>has {votes[maxIndex]} votes</p>
    </div>
  )
}


const Button = ({ onClick, text }) => (
    <button onClick={onClick}>
      {text}
    </button>
  )




const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getRandom = (props) => {
    return (
        [Math.floor((Math.random()*props.anecdotes.length))] 
        )
  } 

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)