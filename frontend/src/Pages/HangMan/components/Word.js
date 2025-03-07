import React from "react";

function Word({ selectedWord, correctLetters }) {
  return (
    <div className="word">
      {selectedWord.split("").map((letter, i) => {
        return (
          <span className="letter" key={i} style={{ margin: "0 10px" }}>
            {correctLetters.includes(letter) ? letter : ""}
          </span>
        );
      })}
    </div>
  );
}

export default Word;

