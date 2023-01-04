import './App.css'
import { useEffect, useState } from 'react'
import SingleCard from './SingleCard'
//initialize array outside of APP so that it does not need to render each time the component is reeveluated. 

const cardImages = [
  {"src" : "/img/helmet-1.png", matched:false},
  {"src" : "/img/potion-1.png", matched:false},
  {"src" : "./img/ring-1.png", matched:false},
  {"src" : "./img/scroll-1.png", matched:false},
  {"src" : "./img/shield-1.png", matched:false},
  {"src" : "./img/sword-1.png", matched:false}
]



function App() {
  const [cards, setCards] = useState([])
  const [turns,setTurns] = useState(0)
  const [choiceOne,setChoiceOne] = useState(null)
  const [choiceTwo,setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)



  //shuffle cards
  const shuffleCards = () => {
    //duplicate cardImages in new array using spread sintax(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)
    const shuffledCards = [...cardImages,...cardImages]
    //sort images to shuffle them. sort fires a function for each item in the array, if we return a number less than zero the order stays the same, if greater it is mixed up
    //Math.random gets us a random number between 0 and 1. 
    .sort(() => Math.random() - 0.5 )
    .map((card) => ({...card, id: Math.random() })) //gives each item a random ID 

    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffledCards)
    setTurns(0)
  }

  //handle choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
    
  }

  //compare 2 selected cards

  useEffect(()=> {
    
    if (choiceOne && choiceTwo){ // if (2 cards are selected){
      setDisabled(true)
      if (choiceOne.src === choiceTwo.src) { //if the source of both cards is the same (same images)
        setCards((prevCards) => {  //set the state(prevcards state as parameter) function 
          return prevCards.map(card => { // return map through previous state (each card {
            if (card.src === choiceOne.src) { //if the cards src is the same as the current choiceOne or two, so find the current cardmatch
              return{...card, matched: true} // spread out the object then return setstate matched to true
            } else {
              return card //else return normal/prev card state
            }
          })
        })
        resetTurn()
      } else {
        
        setTimeout(() =>resetTurn(), 1000)
      }
    }
  }, [choiceOne, choiceTwo])


  //reset choices and increase turn 
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns((prevTurns) => prevTurns + 1)
    setDisabled(false) //after comparison has been made set disabled to false
  }


  //start a new game automatically 
  useEffect(()=> {
    shuffleCards()
  }, [])

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>
        <div className="card-grid">
          {cards.map(card => (
            <SingleCard 
            key={card.id} 
            card={card}
            handleChoice={handleChoice}//send card and handleChoice state as a prop to SingleCard
            flipped={card === choiceOne || card === choiceTwo || card.matched} //flipped = true if {the current card = choiceOne (so both
            //are the same because of the logic in handlechoice or if || the card === choiceTwo or has a property of matched)}
            disabled={disabled}
            />
           ))}
        </div>
        <p>Tries: {turns}</p>
    </div>
  );
}

export default App