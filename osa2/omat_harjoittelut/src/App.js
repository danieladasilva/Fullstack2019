import React, { useState } from 'react'
import Note from './components/Note.js'

const App = (props) => {
    const [notes, setNotes] = useState(props.notes)
    const [newNote, setNewNote] = useState('uusi muistiinpano')
    const [showAll, setShowAll] = useState(true)

    
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