import React from "react"
import dbService from "../services/dbService"

const Display = ({ persons, setPersons }) => {
  const handleDeleteClick = person => {
    console.log(person)
    if (window.confirm(`Delete ${person.name} ?`)) {
      dbService.remove(person.id)
      setPersons(persons.filter(n => n.id !== person.id))
      return null
    }
  }
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
