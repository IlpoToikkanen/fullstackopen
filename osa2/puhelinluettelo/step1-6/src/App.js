import React, { useState, useEffect } from "react"
import Form from "./components/Form"
import Display from "./components/Display"
import Filter from "./components/Filter"
import axios from "axios"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [filter, setNewFilter] = useState("")

  useEffect(() => {
    console.log("effect")
    axios.get("http://localhost:3001/persons").then(response => {
      console.log("promise fulfilled")
      setPersons(response.data)
    })
  }, [])

  const addPerson = event => {
    event.preventDefault()
    if (!persons.some(e => e.name === newName)) {
      const Object = {
        name: newName,
        number: newNumber
      }

      setPersons(persons.concat(Object))
      setNewName("")
      setNewNumber("")
    } else {
      window.alert(`${newName} is already added to the phonebook`)
    }
  }
  const handleNameChange = event => setNewName(event.target.value)

  const handleNumberChange = event => setNewNumber(event.target.value)

  const handleFilterChange = event => {
    setNewFilter(event.target.value)
  }

  const personsToShow = filter
    ? persons.filter(item =>
        item.name.toUpperCase().includes(filter.toUpperCase())
      )
    : persons

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter filter={filter} handleFilterChange={handleFilterChange} />

      <h2>add a new</h2>

      <Form
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>

      <Display persons={personsToShow} />
    </div>
  )
}

export default App
