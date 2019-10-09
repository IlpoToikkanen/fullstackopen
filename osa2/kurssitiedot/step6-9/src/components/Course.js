import React from "react"

const Course = ({ course }) => {
  return (
    <>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </>
  )
}

const Header = ({ course }) => {
  return (
    <>
      <h2>{course.name}</h2>
    </>
  )
}

const Content = ({ course }) => {
  const Contents = course.parts.map(part => {
    return <Part part={part} key={part.name} />
  })
  return <div>{Contents}</div>
}

const Part = ({ part }) => {
  return (
    <>
      <p>
        {part.name} {part.exercises}
      </p>
    </>
  )
}

const Total = ({ course }) => {
  return (
    <div>
      <p id="total">
        total of{" "}
        {course.parts.reduce((total, number) => total + number.exercises, 0)}{" "}
        excercises
      </p>
    </div>
  )
}

export default Course
