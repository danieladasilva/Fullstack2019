import React from 'react'

//OPEN VERSIO KOMPONENTISTA:
// const Note = ({ note }) => {
//   return (
//     <li>{note.content}</li>
//   )
// }

//OMA VERSIO KOMPONENTISTA:
const Note = (props) => {
    const {note, toggleImportance} = props
    const label = note.important
        ? 'make not important' : 'make important'
    return (
        <li>
            {note.content}
            <button onClick={toggleImportance}>{label}</button>
        </li>
    )
}

export default Note


