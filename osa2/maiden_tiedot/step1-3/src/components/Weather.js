import React from "react"

const Weather = ({ countries, setCapital }) => {
  if (countries.length === 1) {
    setCapital(countries[0].capital)
    return <></>
  }
  return <></>
}

export default Weather
