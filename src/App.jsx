import { useState ,useEffect} from 'react'
import './App.css'
import Die from './components/Die'
import {nanoid} from 'nanoid'
import React from 'react'
import Confetti from 'react-confetti'
import Footer from './components/Footer'

function App() {

  const [newDice, setNewDice] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)

  useEffect(() => {
    const allHeld = newDice.every(dice => dice.isHeld)
    const firstValue = newDice[0].value
    const allSameValue = newDice.every(dice => dice.value === firstValue)
    if (allHeld && allSameValue){
      setTenzies(true)
      console.log("you won")
    }
  },[newDice])

  function holdDice(id){
    setNewDice(prevDice => {
      return prevDice.map(die => {
        return die.id === id ? 
        {...die, isHeld: !die.isHeld} : die
      })
    })
  } 

  function allNewDice(){
    const numArray = [];
    for(let i = 0; i < 10; i++){   
      numArray.push({ 
        value: (Math.round(Math.random() * 6)),
        isHeld:false,
        id:nanoid()
      })        
    }
    return numArray;
  }

  function newGame(){
    setNewDice(allNewDice())
    setTenzies(false)
  }
  function roll(){
    setNewDice(prevDice => {
      return prevDice.map(prevDie => {
        return prevDie.isHeld 
        ? prevDie :
        allNewDice()[Math.round(Math.random() * 9)]
      })
    })
    
  }
  
  const diceElements = newDice.map(dice =>( 
      <Die holdDice={() => holdDice(dice.id)} isHeld={dice.isHeld} 
      key={dice.id} number={dice.value}
      />
  ))
  
  return (
    <main>
      {tenzies && <Confetti/>}
      <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze 
            it at its current value between rolls.</p>
      <div className="die-container">
        {diceElements}
      </div>
      <button onClick={tenzies ? newGame : roll} className='roll-btn'>{tenzies ? "New Game" : "Roll"}</button>    
      <Footer/>  
    </main>
  )
}

export default App
