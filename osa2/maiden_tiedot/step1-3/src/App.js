import React, { useState, useEffect } from "react"
import axios from "axios"
import "./App.css"
import Filter from "./components/Filter"
import Display from "./components/Display"
import Weather from "./components/Weather"

const App = () => {
  const defaultWeather = axios
    .get(
      `http://api.weatherstack.com/current?access_key=bc3e880c9b855eb92dbe37fc3c69cf67&query=Helsinki`
    )
    .then(response => response.data)

  const [filter, setNewFilter] = useState("")
  const [countries, setCountries] = useState([])
  const [weather, setWeather] = useState([defaultWeather])
  const [capital, setCapital] = useState("Helsinki")

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then(response => {
      setCountries(response.data)
    })
  }, [])

  useEffect(() => {
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=bc3e880c9b855eb92dbe37fc3c69cf67&query=${capital}`
      )
      .then(response => {
        setWeather(response.data)
      })
  }, [capital])

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
      <Weather countries={countriesToShow} setCapital={setCapital} />
      <Display
        countries={countriesToShow}
        setFilter={setNewFilter}
        weather={weather}
      />
    </div>
  )
}

export default App
