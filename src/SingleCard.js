import "./App.css"

const SingleCard = ({card, handleChoice, flipped, disabled}) => {

    const handleClick = () => {
        if(!disabled){
        handleChoice(card) //so while the delay runs in useEffect we disable handlechoice
        }
    }

    return (  
        <div className="card" >
              <div className={flipped ? "flipped" : ""}> 
                <img className="front" src={card.src} alt="cardFront"/>
                <img src="/img/cover.png" alt="card back" onClick={handleClick} className="back" />
              </div>
        </div>
    );
}
 
export default SingleCard;

