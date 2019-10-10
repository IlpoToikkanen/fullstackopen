import React from "react"

const Display = ({ countries, setFilter, weather }) => {
  if (countries.length > 10) {
    return <p>Too many matches, select another filter</p>
  } else if ((countries.length > 1) & (countries.length <= 10)) {
    return countries.map(item => (
      <p key={item.name}>
        {item.name} <button onClick={() => setFilter(item.name)}>show</button>
      </p>
    ))
  } else if ((countries.length === 1) & (weather != null)) {
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
        <div>
          <h3>Weather in {countries[0].capital}</h3>
          <p>temperature: {weather.current.temperature}</p>
          <p>
            wind: {weather.current.wind_speed} m/s direction{" "}
            {weather.current.wind_dir}{" "}
          </p>
        </div>
      </div>
    )
  }
  return <p>Nothing matches your filter</p>
}

export default Display
