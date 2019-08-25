import React, { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons.js'

const PersonForm = (props) => {
    const {persons, newName, newNumber, 
        setPersons, setNewName, setNewNumber,
        handleNameChange, handleNumberChange} = props

    //Tämä on tapahtumankäsittelijä ja sen voisi ehkä siirtää Appiin???
    const addPerson = (event) => {
        event.preventDefault()
        if (persons.find(person => person.name === newName) === undefined) {
            const personObject = {
                //id: persons.length + 1,
                name: newName,
                number: newNumber
            }
            personService
            .create(personObject) //palauttaa lisätyn personin
              .then(returnedPerson => {
              setPersons(persons.concat(returnedPerson))
              setNewName('')
            })
            console.log('uusi nimi ja numero lisätty:', newName, newNumber)
        } else {
            window.alert(newName + ' is already added to phonebook.')
            console.log('ei lisätty nimeä eikä numeroa')
        }
      }

    return (
        <div>
        <form onSubmit={addPerson}>
            <div>
                Nimi: <input value={newName} onChange={handleNameChange}/> 
                Numero: <input value={newNumber} onChange={handleNumberChange}/>
            </div>
            <div>
                <button type="submit">Lisää</button>
            </div>
        </form>
        </div>
    )
}

const Persons = (props) => {
    const {persons, filter, handleClick} = props
    const filteredPersons = persons.filter(person => person.name.includes(filter))
    return (
        filteredPersons.map(person => 
            <li key={person.id}>
                {person.name} 
                {person.number}
                <button onClick={handleClick(person.id)}>Poista</button>
            </li>
        )
    )  
}

const Filter = (props) => {
    const {filter, handleFilterChange} = props
    return (
        <div>
            <input value={filter} onChange={handleFilterChange}/>
        </div>
    )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName ] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const haeData = () => {
    console.log('Kutsuttiin useEffect-metodia')
    personService
    .getAll()
      .then(initialNotes => {
      setPersons(initialNotes)
    })
    // axios
    //   .get('http://localhost:3001/persons')
    //   .then(response => {
    //     console.log('promise fulfilled')
    //     console.log('data: ', response.data)
    //     setPersons(response.data)
    //   })
  }
  
  useEffect(haeData, [])


    //TAPAHTUMANKÄSITTELIJÄT
  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }

  const handleClick = (id) => {
        personService
        .poista(id)
        .then
  }

  return (
    <div>
      <h1>Puhelinluettelo</h1>

      <h2>Rajaa hakutuloksia</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange}/>

      <h2>Lisää uusi yhteystieto</h2>
      <PersonForm persons={persons} newName={newName} newNumber={newNumber} 
                setPersons={setPersons} setNewName={setNewName} setNewNumber={setNewNumber}
                handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}/>
   
      <h2>Numerot</h2>
      <Persons persons={persons} filter={filter} handleClick={handleClick}/>
    </div>
  )

}

export default App