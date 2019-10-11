import React, { useState, useEffect } from "react"
import Form from "./components/Form"
import Display from "./components/Display"
import Filter from "./components/Filter"
import dbService from "./services/dbService"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [filter, setNewFilter] = useState("")

  useEffect(() => {
    dbService.getAll().then(data => setPersons(data))
  }, [])

  const addPerson = event => {
    event.preventDefault()
    if (persons.some(e => e.name === newName)) {
      if (
        window.confirm(
          `${newName} is already added to the phonebook, replace the old number with a new one?`
        )
      ) {
        const index = persons.map(person => person.name).indexOf(newName)
        const id = persons[index].id
        const changedObject = {
          name: newName,
          number: newNumber,
          id: id
        }

        dbService.updatePerson(changedObject, id)
        const pCopy = [...persons]
        pCopy[index] = changedObject
        setPersons(pCopy)
        return null
      }
      return null
    } else {
      const personObject = {
        name: newName,
        number: newNumber
      }
      dbService.create(personObject).then(data => {
        setPersons(persons.concat(data))
        setNewName("")
        setNewNumber("")
      })
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

      <Display persons={personsToShow} setPersons={setPersons} />
    </div>
  )
}

export default App
