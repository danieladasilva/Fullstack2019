import React from 'react'

//OPEN VERSIO KOMPONENTISTA:
// const Note = ({ note }) => {
//   return (
//     <li>{note.content}</li>
//   )
// }

//OMA VERSIO KOMPONENTISTA:
const Note = (props) => {
    const note = props.note
    return (
        <li>{note.content}</li>
    )
}

export default Note


