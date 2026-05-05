import React from 'react'
export const Card = ({item,className}) => {
  return (
    <div className={`card ${className}`}>
      <h3 style={{marginBottom:'4px'}}>{item.country}</h3>
      <p>
        <strong>Capital:</strong> {item.capital}
      </p>
      <p>
        <strong>Population:</strong> {item.population}
      </p>
      <p>
        <strong>Interesting Fact:</strong> {item.interesting_fact}
      </p>

    </div>
  )
}
