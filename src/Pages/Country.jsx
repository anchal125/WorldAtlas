import './Country.css'
import { Loader } from '../Components/Loader'
import { CountryCard } from '../Components/CountryCard'
import { useCountries } from '../hooks/useCountries'

export const Country = () => { 
  const {isPending,filteredCountries,search,apiData,setFilter,setSearch}=useCountries()
  
  
  if(isPending || apiData.length === 0){
    return <Loader/>
  }

  return (
    <div className='country'>
      <div className="filters">
        <input type="text" value={search} onChange={(e)=>setSearch(e.target.value)} placeholder='Search'/>
        <select name="region" id="region" onChange={(e)=>setFilter(e.target.value)}>
          <option value="All">All</option>
          <option value="Africa">Africa</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Americas">America</option>
          <option value="Oceania">Oceania</option>
          <option value="Antarctic">Antarctica</option>
        </select>
      </div>
      
      <h3>Hover on the cards to see more information</h3>
      <div className='country-cards'>
        {
          filteredCountries.map((item)=>
            <CountryCard key={item.name.common} item={item}/>
          )
        }
      </div>


    </div>
  )
}
