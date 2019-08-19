import React, { useState, useEffect } from 'react'
//import axios from 'axios'

const Filter = (props) => {
  const {filter, handleFilterChange} = props
  return (
      <div>
          Rajaa näytettäviä maita: <input value={filter} onChange={handleFilterChange}/>
      </div>
  )
}

const Countries = (props) => {
  const {countries, filter, setShowCountry} = props
  const filteredCountries = countries.filter(country => country.name.includes(filter))
  
  const showFilteredCountries = () => {
    return (
      filteredCountries.map(country => 
        <li key={country.id}>{country.name}</li>)
    )
  }

  console.log('Maita filteröidyssä taulukossa: ', filteredCountries.length)
  //jos maita on yli 10
  if (filteredCountries.length > 10) {
    console.log('Hakuehdon toteuttavia maita on yli 10.')
    return (
      <div>
        Liikaa maita, tarkenna hakua.
      </div>
    )
  }
  //jos maita on 2-10
  if (filteredCountries.length > 1 && filteredCountries.length < 11) {
    console.log('ehto 2')
    return (
      <div>
        Näytetään 2-10 hakuehdon täyttävää maata.
        {showFilteredCountries()}
      </div>
    )
  }
  //jos maita on tasan 1
  if (filteredCountries.length === 1) {
    console.log('ehto3.')
    //setShowCountry(filteredCountries[0])
    console.log(filteredCountries[0].name)
    return (
        filteredCountries.map(country => 
        <li key={country.id}>{country.name}</li>)
    )
  } 
  //jos maita on tasan 0
  if (filteredCountries.length === 0) {
    console.log('ehto 4')
    return (
      <div>
        Ei hakuehdon täyttäviä maita.
      </div>
    )
  }
}

const Country = (props) => {
  const {showCountry} = props
  return (
    <div>
      Tässä näytetään maahan liittyvät tiedot
    </div>
  )
}

const App = () => {
    const [countries, setCountries] = useState([
      { id: 0, name: 'finland', capital: 'Helsinki', population: '5 million', languages: ['finnish', 'swedish'] },
      { id: 1, name: 'sweden', capital: 'Stockholm', population: '6 million', languages: ['sweden'] },
      { id: 2, name: 'spain', capital: 'Madrid', population: '7 million', languages: ['spain', 'catalan'] },
      { id: 3, name: 'portugal', capital: 'Lisbon', population: '8 million', languages: ['portugal'] },
      { id: 4, name: 'norway', capital: 'Oslo', population: '10 million', languages: ['norwegian'] },
    ])
    const [filter, setFilter] = useState('')
    const [showCountry, setShowCountry] = useState('')

//TAPAHTUMANKÄSITTELIJÄT TÄNNE

    const handleFilterChange = (event) => {
      console.log(event.target.value)
      setFilter(event.target.value)
    }
  
    return (
      <div>
        <h1> Find countries </h1>
        <Filter filter={filter} handleFilterChange={handleFilterChange}/>
        <Countries countries={countries} filter={filter}/>
      </div>
    )
  }

export default App
