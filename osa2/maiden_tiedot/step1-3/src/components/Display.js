import React, { useEffect, useState } from "react"
import axios from "axios"

const Display = ({ countries, setFilter }) => {
  const [capital, setCapital] = useState("Helsinki")
  const [weather, setWeather] = useState([])

  useEffect(() => {
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=bc3e880c9b855eb92dbe37fc3c69cf67&query=Helsinki`
      )
      .then(response => {
        setWeather(response.data)
      })
  }, [])

  if (countries.length > 10) {
    return <p>Too many matches, select another filter</p>
  } else if ((countries.length > 1) & (countries.length <= 10)) {
    return countries.map(item => (
      <p key={item.name}>
        {item.name} <button onClick={() => setFilter(item.name)}>show</button>
      </p>
    ))
  } else if (countries.length === 1) {
    if (countries[0].capital !== capital) {
      setCapital(countries[0].capital)
      axios
        .get(
          `http://api.weatherstack.com/current?access_key=bc3e880c9b855eb92dbe37fc3c69cf67&query=${countries[0].capital}`
        )
        .then(response => {
          setWeather(response.data)
        })
    }

    return (
      <div>
        <h2>{countries[0].name}</h2>
        <p>capital {countries[0].capital}</p>
        <p>population {countries[0].population}</p>
        <h3>languages</h3>
        <ul>
          {countries[0].languages.map(languages => (
            <li key={languages.name}>{languages.name}</li>
          ))}
        </ul>
        <img
          src={countries[0].flag}
          alt="new"
          style={{ height: "100px", width: "auto", border: "1px black solid" }}
        />
        <Weather weather={weather} capital={capital} />
      </div>
    )
  }
  return <p>Nothing matches your filter</p>
}

const Weather = ({ weather, capital }) => {
  return (
    <div>
      <h3>Weather in {capital}</h3>
      <p>temperature: {weather.current.temperature}</p>
      <p>
        wind: {weather.current.wind_speed} m/s direction{" "}
        {weather.current.wind_dir}{" "}
      </p>
    </div>
  )
}

export default Display
