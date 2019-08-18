import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
      {id: 0, 
      name: 'Arto Hellas'}
  ]) 
  const [newName, setNewName ] = useState('')

  const allPersons = () => {
    return (
      persons.map(person => 
          <li key={person.id}>{person.name}</li>
          )
      )
    }

  const addPerson = (event) => {
    event.preventDefault()

    const loydetty = persons.find(person => person.name === newName)
    console.log(loydetty)
    
    if (persons.find(person => person.name === newName) === undefined) {
        //const muuttuja = persons.find(person => person.name === newName)
        const personObject = {
            id: persons.length + 1,
            name: newName
        }
        //concat luo uuden persons-taulukon, johon on
        //lisätty alkio 'personObject'
        setPersons(persons.concat(personObject))
        //tyhjennetään newName-objekti??
        setNewName('')
        console.log('moi')
    }
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <form onSubmit={addPerson}>
        <div>
          Nimi: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          <button type="submit">Lisää</button>
        </div>
      </form>
      <h2>Numerot</h2>
        <ul>
            {allPersons()}
        </ul>
    </div>
  )

}

export default App