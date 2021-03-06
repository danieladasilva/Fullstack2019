import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
    return (
        <div>
            <h1> {props.header} </h1>
        </div>
    )
}

const Button = (props) => {
    return (
        <button onClick={props.action}>
            {props.text}
        </button>   
    )
}

const Anecdote = (props) => {
    return (
        <div>
            <p> {anecdotes[props.anecdote]} </p>
            <p> Votes: {props.votes} </p>
        </div>
    )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array.apply(null, new Array(6)).map(Number.prototype.valueOf,0))

  const max = votes.indexOf(Math.max(...votes))
  console.log(max)

  const newRandomAnecdote = () => {
    const randomIndex = Math.floor(Math.random() * anecdotes.length)
    // console.log(randomIndex)
    setSelected(randomIndex)
  } 
  
  const Vote = () => {
      const copy = [...votes]
      copy[selected] += 1
      setVotes(copy)
    //   console.log(votes[selected])
  }

  return (
    <div>
      <Header header={'Anecdote of the day'}/>
      <Anecdote anecdote={selected} votes={votes[selected]}/>
      <Button action={Vote} text={'Vote'}/>
      <Button action={newRandomAnecdote} text={'Next anecdote'}/>
      <Header header={'Anecdote with most votes'}/>
      <Anecdote anecdote={max} votes={votes[max]}/>
    </div>
  )
}

const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)