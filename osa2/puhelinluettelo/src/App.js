import React, { useState } from 'react'

const PersonForm = (props) => {
    const {persons, newName, newNumber, 
        setPersons, setNewName, setNewNumber,
        handleNameChange, handleNumberChange} = props

    //Tämä on tapahtumankäsittelijä ja sen voisi ehkä siirtää Appiin???
    const addPerson = (event) => {
        event.preventDefault()
        //jos nimi on jo taulukossa, palauttaa nimen
        //jos nimi ei ole taulukossa, palauttaa 'undefined'
        //eli jos nimi ei ole taulukossa (eli undefined === undefined), niin
        //mennään sisään ja lisätään se taulukkoon
        if (persons.find(person => person.name === newName) === undefined) {
            const personObject = {
                id: persons.length + 1,
                name: newName,
                number: newNumber
            }
            //concat luo uuden persons-taulukon, johon on
            //lisätty alkio 'personObject'
            setPersons(persons.concat(personObject))
            //tyhjennetään newName-objekti??
            setNewName('')
            setNewNumber('')
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
    const {persons, filter} = props
    const filteredPersons = persons.filter(person => person.name.includes(filter))
    return (
        filteredPersons.map(person => 
            <li key={person.id}>{person.name} {person.number}</li>
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
  const [persons, setPersons] = useState([
      {id: 0, name: 'Arto Hellas', number: '050-1234567'},
      {id: 1, name: 'Rami', number: '040-1234567'},
      {id: 2, name: 'Daniela', number: '050-7654321'}]) 
  
  const [newName, setNewName ] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

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
      <Persons persons={persons} filter={filter}/>
    </div>
  )

}

export default App