import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import './index.css'

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total , setTotal] = useState(0)


  const handleGoodClick = () => {
      setGood(good + 1)
      setTotal(total + 1)
  }
  const handleNeutralClick = () => {
      setNeutral(neutral + 1)
      setTotal(total + 1)
  }
  const handleBadClick = () => {
      setBad(bad + 1)
      setTotal(total + 1)
  }

  return (
    <div>
      <Header />
      <Button onClick={handleGoodClick} text='good' />
      <Button onClick={handleNeutralClick} text='neutral' />
      <Button onClick={handleBadClick} text='bad' />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} total={total}/>
    </div>
  )
}

const countAverage = (props) => props.total===0 ? 0 : (props.good - props.bad)/props.total

const countPositive = (props) => {
    if (props.total === 0) {
        return (0)
    }
    return (
        <>{(props.good/props.total)*100} %</>
    )
}

const Header = () => {
    return (
    <h1>give feedback</h1>
    )
}

const Button = ({ onClick, text }) => (
    <button onClick={onClick}>
      {text}
    </button>
  )


const Statistics = (props) => {
    if (props.total === 0) {
        return (
            <>
            <p>No feedback given</p>
            </>
        )
    }
    return (
        <table>
            <tbody>
        <Statistic text='good' value={props.good} />
        <Statistic text='neutral' value={props.neutral} />
        <Statistic text='bad' value={props.bad} />
        <Statistic text='all' value={props.total} />
        <Statistic text='average' value={countAverage(props)} />
        <Statistic text='positive' value={countPositive(props)} />
            </tbody>
        </table>
    )
  }

const Statistic = (props) => {
    return (
        <tr>
            <td>{props.text}</td> 
            <td>{props.value}</td>
        </tr>
    )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)