import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = (props) => {
  const {filter, handleFilterChange} = props
  return (
      <div>
          Rajaa näytettäviä maita: <input value={filter} onChange={handleFilterChange}/>
      </div>
  )
}

const Countries = (props) => {
  const {countries, handleClick, showCountry} = props

  //jos maita on yli 10
  if (countries.length > 10) {
    return (
      <div>
        Liikaa maita, tarkenna hakua.
      </div>
    )
  }
  //jos maita on 2-10
  if (countries.length > 1 && countries.length < 11) {
    return (
      <div>
        {countries.map((country, indeksi) => 
          <div key={indeksi}>
              {country.name}
              <button onClick={handleClick(country)}>Näytä</button><br/>
          {showCountry === country.name && <Country country={country}/>}
          </div>
        )}     
      </div>
    )
  }
  //jos maita on tasan 1
  if (countries.length === 1) {
    return (
      <Country country={countries[0]}/>
    )
  } 
  //jos maita on tasan 0
  if (countries.length === 0) {
    return (
      <div>
        Ei hakuehdon täyttäviä maita.
      </div>
    )
  }
}

const Country = (props) => {
  const {country} = props
  console.log(country)

  return (
    <div>
      <h1>{country.name}</h1>
      <div>
        <p><b>Capital:</b> {country.capital}</p>
        <p><b>Population:</b> {country.population}</p>
        <p><b>Languages:</b> {country.languages.map((language, indeksi) => 
        <li key={indeksi}> {language.name} </li> )} </p>
        <p>  <img src={country.flag} alt="Country flag" style={ {width: '180px', height: '150px'}}/> </p>
      </div>
    </div>
  )
}

const App = () => {
    const [countries, setCountries] = useState([])
    const [filter, setFilter] = useState('')
    const [country, setCountry] = useState('')
    const [showCountry, setShowCountry] = useState('')

      const haeData = () => {
        console.log('Kutsuttiin useEffect-metodiaa')
        axios
          .get('https://restcountries.eu/rest/v2/name/' + filter)
          .then(response => {
            console.log('promise fulfilled')
            setCountries(response.data)
          })
          .catch( (e) => {
            setCountries([])
          })
      }
      useEffect(haeData, [filter])



//TAPAHTUMANKÄSITTELIJÄT TÄNNE

    const handleFilterChange = (event) => {
      console.log(event.target.value)
      setFilter(event.target.value)
    }
    
    const handleClick = (country) => () => {
        setShowCountry(country.name)
  
    }
  
    return (
      <div>
        <h1> Find countries </h1>
        <Filter filter={filter} handleFilterChange={handleFilterChange}/>
        <Countries countries={countries} filter={filter} handleClick={handleClick} showCountry={showCountry}/>
      </div>
    )
  }

export default App
