import React, { useState, useEffect } from "react"
import axios from "axios"
import "./App.css"
import Filter from "./components/Filter"
import Display from "./components/Display"

const App = () => {
  const [filter, setNewFilter] = useState("")
  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then(response => {
      setCountries(response.data)
    })
  }, [])

  const handleFilterChange = event => {
    setNewFilter(event.target.value)
  }

  const countriesToShow = filter
    ? countries.filter(item =>
        item.name.toUpperCase().includes(filter.toUpperCase())
      )
    : countries

  return (
    <div>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <Display countries={countriesToShow} setFilter={setNewFilter} />
    </div>
  )
}

export default App
