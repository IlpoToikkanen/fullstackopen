import React from "react"

const Display = ({ persons }) => {
  return (
    <div>
      {persons.map(item => (
        <p key={item.name}>
          {item.name} {item.number}
        </p>
      ))}
    </div>
  )
}

export default Display
