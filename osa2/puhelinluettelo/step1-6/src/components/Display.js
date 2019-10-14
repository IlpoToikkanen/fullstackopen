import React from "react"

const Display = ({ persons, handleDeleteClick }) => {
  return (
    <div>
      {persons.map(person => {
        return (
          <div key={person.name}>
            <p>
              {person.name} {person.number}
            </p>
            <Button text={"delete"} onClick={() => handleDeleteClick(person)} />
          </div>
        )
      })}
    </div>
  )
}

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>
export default Display
