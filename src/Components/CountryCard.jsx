import React,{ useState } from 'react'
import { Link } from 'react-router-dom';
import "./CountryCard.css"
import { FaArrowRight } from "react-icons/fa";
export const CountryCard = ({item}) => {
  
  return (
    <div className='country-card card'>
      <div className="front">
        <img loading='lazy' src={item.flags.svg} alt="flag"/>
      </div> 
      
      <div className="back">
        <h3>{item.name.common.length>12?item.name.common.slice(0,10)+"...":item.name.common}</h3>
        <p>Population: {item.population.toLocaleString()}</p> 
        <p>Capital: {item.capital.length>0?item.capital.join(", "):'None'}</p>
        <Link to={`/Country/${item.name.common}`}>
        <button className='read'>Read More<FaArrowRight/></button></Link>

      </div>
      
    </div>
  )
}
