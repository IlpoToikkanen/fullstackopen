import React, { useState } from "react"

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" }
  ])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [filter, setNewFilter] = useState("")

  const addPerson = event => {
    event.preventDefault()
    if (!persons.some(e => e.name === newName)) {
      console.log(persons)
      const Object = {
        name: newName,
        number: newNumber
      }

      setPersons(persons.concat(Object))
      setNewName("")
      setNewNumber("")
      console.log("täällä", newName)
    } else {
      window.alert(`${newName} is already added to the phonebook`)
    }
  }
  const handleNameChange = event => setNewName(event.target.value)

  const handleNumberChange = event => setNewNumber(event.target.value)

  const handleFilterChange = event => {
    setNewFilter(event.target.value)
    console.log(persons.map(item => item.name.includes(filter)))
  }

  const personsToShow = filter
    ? persons.filter(item =>
        item.name.toUpperCase().includes(filter.toUpperCase())
      )
    : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter: <input value={filter} onChange={handleFilterChange} />
      </div>
      <h2>add a new</h2>
      <Form />
      <h2>Numbers</h2>
      <div>
        <Display persons={personsToShow} />
      </div>
    </div>
  )
}
// TÄS JUMIS
const Form = () => {
  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Display = ({ persons }) => {
  return persons.map(item => (
    <p key={item.name}>
      {item.name} {item.number}
    </p>
  ))
}

export default App
