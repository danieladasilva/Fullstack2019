import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Naytto = (props) => {
    return (
        <div>{props.laskuri}</div>
    )
}

const Button = (props) => {
    return (
        <button onClick={props.klikkaus}>
            {props.teksti}
        </button>
    )
}

const App = (props) => {
    const [laskuri, setLaskuri] = useState(0)
    const [klikkaukset, setKlikkaukset] = useState({
        left: 0,
        right: 0
    })
  
    const lisaaKlikkaus = () => {
      console.log('klikattu')
      setLaskuri(laskuri + 1)
    }

    const nollaaKlikkaukset = () => {
        console.log('nollattu')
        setLaskuri(0)
      }
//tämä on funktio, joka palauttaa funktion,
//muuten ei toimisi tapahtumankäsittelijänä alempana
    const muutaLaskurin1Arvoa = (arvo) => {
        return () => {
            setLaskuri(arvo) 
        }    
    }

    return (
      <div>
        <Naytto laskuri={laskuri}/>
        <Button klikkaus={lisaaKlikkaus} teksti={'klikkaa'}/>
        <Button klikkaus={nollaaKlikkaukset} teksti={'nollaa'}/>
      </div>
    )
  }
  
  ReactDOM.render(
    <App />, 
    document.getElementById('root')
  )
