import React, { useState, useEffect } from "react";
import "./HangMan.css";
import Word from "./components/Word";
import Figure from "./components/Figure";
import WrongLetters from "./components/WrongLetters";
import Header from "./components/header";
import { showNotification as show } from "./Helper/helper";
import Notification from "./components/Notification";
import Popup from "./components/Popup";

// Rainbow
const words = [
"electorate",
"ballot",
"candidate",
"polling",
"constituency",
"franchise",
"nomination",
"manifesto",
"booth",
"commission",
"schedule",
"counting",
"campaign",
"scrutiny",
"electoral",
"officer",
"voter",
"quorum",
"majority",
"mandate",

];

let selectedWord = words[Math.floor(Math.random() * words.length)];

let playable = true;

function HangMan() {
  const [playable, setPlayable] = useState(true);
  const [correctLetters, setCorrectLetter] = useState([]);
  const [wrongLetters, setwrongLetters] = useState([]);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const handlekeydown = (event) => {
      const { key, keyCode } = event;
      if (playable && keyCode >= 65 && keyCode <= 90) {
        const letter = key.toLowerCase();

        // Ignore spaces in the word
        if (letter === " ") return;

        if (selectedWord.includes(letter)) {
          if (!correctLetters.includes(letter)) {
            setCorrectLetter((currentLetters) => [...currentLetters, letter]);
          } else {
            show(setShowNotification);
          }
        } else {
          if (!wrongLetters.includes(letter)) {
            setwrongLetters((wrongLetters) => [...wrongLetters, letter]);
          } else {
            show(setShowNotification);
          }
        }
      }
    };
    window.addEventListener("keydown", handlekeydown);
    return () => window.removeEventListener("keydown", handlekeydown);
  }, [correctLetters, wrongLetters, playable]);

  function playAgain() {
    setPlayable(true);

    // Empty arrays
    setCorrectLetter([]);
    setwrongLetters([]);

    // Select a new word
    const random = Math.floor(Math.random() * words.length);
    selectedWord = words[random];

    // Pre-fill some letters
    const prefilledLetters = Array.from(new Set(selectedWord.replace(/\s+/g, ""))) // Remove spaces before shuffling
      .sort(() => 0.5 - Math.random()) // Shuffle the letters
      .slice(0, 2); // Choose how many to reveal
    setCorrectLetter(prefilledLetters);
  }

  useEffect(() => {
    const prefilledLetters = Array.from(new Set(selectedWord.replace(/\s+/g, "")))
      .sort(() => 0.5 - Math.random())
      .slice(0, 2);
    setCorrectLetter(prefilledLetters);
  }, []);

  return (
    <div className="HangManBody">
      <Header />
      <div className="HangMangame-container">
        <Figure wrongLetters={wrongLetters} />
        <WrongLetters wrongLetters={wrongLetters} />
        <Word selectedWord={selectedWord} correctLetters={correctLetters} />
      </div>
      <Popup
        correctLetters={correctLetters}
        wrongLetters={wrongLetters}
        selectedWord={selectedWord}
        setPlayable={setPlayable}
        playAgain={playAgain}
      />
      {showNotification && <Notification />}
    </div>
  );
}

export default HangMan;



