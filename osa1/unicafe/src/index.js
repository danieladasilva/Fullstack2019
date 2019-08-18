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
        <button onClick={props.feedback}>
            {props.text}
        </button>
    )
}

const Statistic = (props) => {
    return (
        <tr> 
            <td> {props.text}: </td>
            <td> {props.value} </td>
        </tr>
    )
}

const Statistics = (props) => {
    const total = props.good + props.neutral + props.bad
    const average = (props.good - props.bad) / total
    const positives = (props.good / total) * 100

    if (total === 0) {
        return (
            'No feedback given'
        )
    }

    if (total !== 0) {
        return (
            <div>
                <table>
                    <tbody>
                        <Statistic text={'Good'} value={props.good}/>
                        <Statistic text={'Neutral'} value={props.neutral}/>
                        <Statistic text={'Bad'} value={props.bad}/>
                        <Statistic text={'Total'} value={total}/>
                        <Statistic text={'Average'} value={average}/>
                        <Statistic text={'Positives'} value={positives + ' %'}/>
                    </tbody>
                </table>
            </div>
        ) 
         
    }
}

const App = (props) => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
  
    const addGood = () => {
        console.log('Good')
        setGood(good + 1)
    }

    const addNeutral = () => {
        console.log('Neutral')
        setNeutral(neutral + 1)
    }

    const addBad = () => {
        console.log('Bad')
        setBad(bad + 1)
    }

    return (
      <div>
        <Header header={'Give feedback'}/> 
        <Button feedback={addGood} text={'Good'}/>
        <Button feedback={addNeutral} text={'Neutral'}/>
        <Button feedback={addBad} text={'Bad'}/>
        <Header header={'Statistics'}/> 
        <Statistics good={good} neutral={neutral} bad={bad}/>
      </div>
    )
  }
  
  ReactDOM.render(
    <App />, 
    document.getElementById('root')
  )
