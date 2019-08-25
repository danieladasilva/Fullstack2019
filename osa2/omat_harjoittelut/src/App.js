import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Note from './components/Note.js'
import noteService from './services/notes.js'

const App = () => {
    const [notes, setNotes] = useState([])
    const [newNote, setNewNote] = useState('')
    const [showAll, setShowAll] = useState(true)

    const haeData = () => {
      console.log('Kutsuttiin useEffect-metodia')
      noteService
      .getAll()
        .then(initialNotes => {
        setNotes(initialNotes)
      })
      // axios
      //   .get('http://localhost:3001/notes/')
      //   .then(response => {
      //     console.log('promise fulfilled')
      //     console.log('data: ', response.data)
      //     setNotes(response.data)
      //   })
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
              <Note 
                key={note.id} 
                note={note}
                toggleImportance={() => toggleImportanceOf(note.id)}/>
              )
        )
    }

    // TAPAHTUMANKÄSITTELIJÄT

    const addNote = (event) => {
      event.preventDefault()
      const noteObject = {
        content: newNote,
        date: new Date().toISOString(),
        important: Math.random() > 0.5,
      }

      noteService
      .create(noteObject)
        .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote('')
      })
      // axios
      //   .post('http://localhost:3001/notes', noteObject)
      //   .then(response => {
      //     //concat luo uuden taulukon johon lisää halutun jutun
      //     setNotes(notes.concat(response.data))
      //     setNewNote('')
      //   console.log(response)
      // })
    }

    const handleNoteChange = (event) => {
      console.log(event.target.value)
      setNewNote(event.target.value)
    }

    const handleClick = () => {
      setShowAll(!showAll)
    }

    const toggleImportanceOf = id => {
      //const url = `http://localhost:3001/notes/${id}`
      const note = notes.find(n => n.id === id)
      const changedNote = { ...note, important: !note.important }
    
      noteService
      .update(id, changedNote)
        .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
      // axios.put(url, changedNote).then(response => {
      //   setNotes(notes.map(note => note.id !== id ? note : response.data))
      // })

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