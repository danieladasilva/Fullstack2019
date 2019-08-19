import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Note from './components/Note.js'

const App = () => {
    const [notes, setNotes] = useState([])
    const [newNote, setNewNote] = useState('')
    const [showAll, setShowAll] = useState(true)

    const haeData = () => {
      console.log('Kutsuttiin useEffect-metodia')
      axios
        .get('http://localhost:3001/notes')
        .then(response => {
          console.log('promise fulfilled')
          console.log('data: ', response.data)
          setNotes(response.data)
        })
    }
    
    useEffect(haeData, [])
    console.log('render', notes.length, 'notes')
    
    //muuttujan arvoksi asetetaan 'notes' jos showAll on true
    //ja 'notes.filter..' jos showAll on false
    const notesToShow = showAll
    ? notes : notes.filter(note => note.important === true)
  
    const allNotes = () => {
        return (
          notesToShow.map(note => 
              <Note key={note.id} note={note}/>
              )
        )
    }

    const addNote = (event) => {
      event.preventDefault()
      const noteObject = {
        content: newNote,
        date: new Date().toISOString(),
        important: Math.random() > 0.5,
        id: notes.length + 1,
      }
      //concat luo uuden notes-taulukon, johon on
      //lisätty alkio 'noteObject'
      setNotes(notes.concat(noteObject))
      //tyhjennetään newNote-objekti??
      setNewNote('')
    }

    const handleNoteChange = (event) => {
      console.log(event.target.value)
      setNewNote(event.target.value)
    }

    const handleClick = () => {
      setShowAll(!showAll)
    }

  
    return (
      <div>
        <h1>Notes</h1>
        <div>
          <button onClick={handleClick}>
            {showAll ? 'show important' : 'show all' }
          </button>
        </div>
        <ul>
          {allNotes()}
        </ul>
        <form onSubmit={addNote}>
          <input 
            value={newNote} 
            onChange={handleNoteChange}
          />
          <button type="submit">tallenna</button>
        </form> 
      </div>
    )
  }

export default App