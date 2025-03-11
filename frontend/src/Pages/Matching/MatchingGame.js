import React, { useState } from "react";
import "./MatchingGame.css"; 
const categories = {
  directivePrinciples: "Directive Principles",
  fundamentalRights: "Fundamental Rights",
  duties: "Fundamental Duties",
};

const initialItems = [
  { id: "item1", text: "Free legal aid to the poor", category: "directivePrinciples" },
  { id: "item2", text: "Right to equality", category: "fundamentalRights" },
  { id: "item3", text: "Protection of the environment", category: "directivePrinciples" },
  { id: "item4", text: "Right to freedom of speech", category: "fundamentalRights" },
  { id: "item5", text: "Promotion of international peace", category: "directivePrinciples" },
  { id: "item6", text: "Respect for the national flag", category: "duties" },
  { id: "item7", text: "Right to constitutional remedies", category: "fundamentalRights" },
  { id: "item8", text: "Develop scientific temper", category: "duties" },
  { id: "item9", text: "Equal pay for equal work", category: "directivePrinciples" },
  { id: "item10", text: "Right to education", category: "fundamentalRights" },
  { id: "item11", text: "Safeguarding public property", category: "duties" },
  { id: "item12", text: "Separation of judiciary from the executive", category: "directivePrinciples" },
  { id: "item13", text: "Right to vote", category: "fundamentalRights" },
  { id: "item14", text: "Providing opportunities for children", category: "directivePrinciples" },
  { id: "item15", text: "Compulsory education for children", category: "directivePrinciples" },
  { id: "item16", text: "Right to practice any religion", category: "fundamentalRights" },
  { id: "item17", text: "Duty to defend the country", category: "duties" },
  { id: "item18", text: "Organization of village panchayats", category: "directivePrinciples" },
  { id: "item19", text: "Right against discrimination", category: "fundamentalRights" },
  { id: "item20", text: "Duty to promote harmony", category: "duties" },
];

const MatchingGame = () => {
  const [items, setItems] = useState(initialItems);
  const [draggedItem, setDraggedItem] = useState(null);

  const handleDragStart = (id) => {
    setDraggedItem(id);
  };

  const handleDrop = (category) => {
    if (!draggedItem) return;

    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === draggedItem
          ? { ...item, placedCategory: category, correct: item.category === category }
          : item
      )
    );

    setDraggedItem(null);
  };

  return (
    <div className="MatchingBody">
    <div className="matching-game">
      <h1 className="HeaderMatchinngCss"> Directive Principles vs. Fundamental Rights vs. Duties</h1>
      <p className="ParaMatchingCss">Drag the statements into the correct categories.</p>

      <div className="matching-container">
        {Object.entries(categories).map(([key, title]) => (
          <div
            key={key}
            className="matching-drop-area"
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(key)}
          >
            <h2>{title}</h2>
            {items
              .filter((item) => item.placedCategory === key)
              .map((item) => (
                <div key={item.id} className={`matching-item ${item.correct ? "matching-correct" : "matching-incorrect"}`}>
                  {item.text}
                </div>
              ))}
          </div>
        ))}
      </div>

      <div className="matching-items-container">
        {items
          .filter((item) => !item.placedCategory)
          .map((item) => (
            <div
              key={item.id}
              className="matching-item"
              draggable
              onDragStart={() => handleDragStart(item.id)}
            >
              {item.text}
            </div>
          ))}
      </div>
    </div>
    </div>
  );
};

export default MatchingGame;
