import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {

  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  console.log(course)
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}



const Header = (props) => {
    return (
      <>
        <h1>{props.course.name}</h1>
      </>
    )
}

const Content = (props) => {

    return (
        <>
          <Part p1={props.course.parts[0].name} e1={props.course.parts[0].exercises}/>
          <Part p1={props.course.parts[1].name} e1={props.course.parts[1].exercises}/>
          <Part p1={props.course.parts[2].name} e1={props.course.parts[2].exercises}/>
        </>
    )
}

const Part = (props) => {
    return (
      <>
        <p>
          {props.p1} {props.e1}
        </p>
      </>
    )
}

const Total = (props) => {
  return (
    <>
      <p>Number of exercises {props.course.parts[0].exercises + props.course.parts[1].exercises + props.course.parts[2].exercises}</p>
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))