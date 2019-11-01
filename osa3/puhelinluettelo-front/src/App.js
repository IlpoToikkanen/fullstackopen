import React, { useState, useEffect } from 'react'
import Form from './components/Form'
import Display from './components/Display'
import Filter from './components/Filter'
import Notification from './components/Notification'
import dbService from './services/dbService'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setNewFilter] = useState('')
  const [notificationInformation, setNotificationInformation] = useState(null)

  useEffect(() => {
    dbService.getAll().then(data => setPersons(data))
  }, [])

  const addPerson = event => {
    event.preventDefault()
    if (!newName) {
      setNotificationInformation({
        text: 'Please insert name',
        type: 'error'
      })
      setTimeout(() => {
        setNotificationInformation(null)
      }, 3000)
      return null
    } else if (!newNumber) {
      setNotificationInformation({
        text: 'Please insert number',
        type: 'error'
      })
      setTimeout(() => {
        setNotificationInformation(null)
      }, 3000)
      return null
    } else if (persons.some(e => e.name === newName)) {
      if (
        window.confirm(
          `${newName} is already added to the phonebook, replace the old number with a new one?`
        )
      ) {
        const index = persons.map(person => person.name).indexOf(newName)
        const id = persons[index].id
        const changedPerson = {
          name: newName,
          number: newNumber,
          id: id
        }

        dbService
          .updatePerson(changedPerson, id)
          .then(returnedPerson => {
            setPersons(
              persons.map(person =>
                person.id !== id ? person : returnedPerson
              )
            )
            setNotificationInformation({
              text: `Number for ${newName} updated succesfully`,
              type: 'notification'
            })
            setTimeout(() => {
              setNotificationInformation(null)
            }, 3000)
            setNewName('')
            setNewNumber('')
          })
          .catch(() => {
            setNotificationInformation({
              text: `${newName} no longer exists in the phonebook`,
              type: 'error'
            })
            setTimeout(() => {
              setNotificationInformation(null)
            }, 3000)
            setPersons(persons.filter(n => n.name !== newName))
          })
        return null
      }
      return null
    } else {
      const personObject = {
        name: newName,
        number: newNumber
      }
      dbService
        .create(personObject)
        .then(data => {
          setPersons(persons.concat(data))
          setNotificationInformation({
            text: `Added ${newName}`,
            type: 'notification'
          })
          setTimeout(() => {
            setNotificationInformation(null)
          }, 3000)
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          setNotificationInformation({
            text: error.response.data.error,
            type: 'error'
          })
          setTimeout(() => {
            setNotificationInformation(null)
          }, 3000)
        })
    }
  }
  const handleDeleteClick = person => {
    if (window.confirm(`Delete ${person.name} ?`)) {
      dbService
        .remove(person.id)
        .then(() => {
          setPersons(persons.filter(n => n.name !== person.name))
          setNotificationInformation({
            text: `Deleted ${person.name}`,
            type: 'notification'
          })
          setTimeout(() => {
            setNotificationInformation(null)
          }, 3000)
        })
        .catch(() => {
          setPersons(persons.filter(n => n.name !== person.name))
          setNotificationInformation({
            text: `${person.name} no longer exists in the phonebook`,
            type: 'error'
          })
          setTimeout(() => {
            setNotificationInformation(null)
          }, 3000)
        })

      return null
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
      <Notification information={notificationInformation} />
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

      <Display persons={personsToShow} handleDeleteClick={handleDeleteClick} />
    </div>
  )
}

export default App
