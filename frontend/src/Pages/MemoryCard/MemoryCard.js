import { useEffect, useState } from 'react';
import './MemoryCard.css';
import SingleCard from "./Components/SingleCard";


const cardImages = [
  { "src": "/img/WhatsApp Image 2024-11-10 at 21.51.22.jpeg", "audio": "/sounds/Article 19.mp3", matched: false },
  { "src": "/img/image.png", "audio": "/sounds/Article 49.mp3", matched: false },
  { "src": "/img/WhatsApp Image 2024-11-10 at 22.02.31.jpeg", "audio": "/sounds/Article 368.mp3", matched: false },
  { "src": "/img/WhatsApp Image 2024-11-10 at 22.02.52.jpeg", "audio": "/sounds/Article 45.mp3", matched: false },
  { "src": "/img/WhatsApp Image 2024-11-10 at 22.03.43.jpeg", "audio": "/sounds/Article 21.mp3", matched: false },
  { "src": "/img/WhatsApp Image 2024-11-10 at 22.06.33.jpeg", "audio": "/sounds/Article 24.mp3", matched: false },
];

function MemoryCard() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(false); // New state to track audio playing

  // Shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
  };

  // Handle a choice
  const handleChoice = (card) => {
    if (audioPlaying || disabled) return; // Prevent choosing cards while audio is playing or cards are disabled
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  // Compare 2 selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);

      if (choiceOne.src === choiceTwo.src) {
        // Play the specific sound for the matched card pair
        const matchSound = new Audio(choiceOne.audio); // Use audio path from matched card
        setAudioPlaying(true); // Set audio playing to true
        matchSound.play(); // Play the sound immediately when a match is detected

        // Reset audioPlaying state after the audio finishes
        matchSound.onended = () => {
          setAudioPlaying(false); // Reset audioPlaying after the audio finishes
        };

        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });

        setTimeout(resetTurn, 1000); // Delay reset so users can see the match
      } else {
        setTimeout(resetTurn, 1000); // Delay reset if not matched
      }
    }
  }, [choiceOne, choiceTwo]);

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  // Start a new game automatically
  useEffect(() => {
    shuffleCards();
  }, []);

  return (
    <div className="MemoryCardBackground">
    <div className="MemoryCard">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <p>Turns: {turns}</p>
    </div>
    </div>
  );
}

export default MemoryCard;


