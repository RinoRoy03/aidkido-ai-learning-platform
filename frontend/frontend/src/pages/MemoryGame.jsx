import React, { useState } from "react";

const emojis = ["🐶","🐶","🐱","🐱","🍎","🍎","⭐","⭐"];

export default function MemoryGame() {
  const [cards, setCards] = useState(
    emojis.sort(() => 0.5 - Math.random()).map((e, i) => ({
      id: i,
      emoji: e,
      flipped: false
    }))
  );

  const flipCard = (id) => {
    setCards(prev =>
      prev.map(c =>
        c.id === id ? { ...c, flipped: !c.flipped } : c
      )
    );
  };

  return (
    <div style={{ padding: 40, textAlign: "center" }}>
      <h2>🧠 Memory Game</h2>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 80px)",
        gap: 10,
        justifyContent: "center"
      }}>
        {cards.map(card => (
          <div
            key={card.id}
            onClick={() => flipCard(card.id)}
            style={{
              height: 80,
              fontSize: 40,
              background: "#ffd166",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              borderRadius: 10
            }}
          >
            {card.flipped ? card.emoji : "❓"}
          </div>
        ))}
      </div>
    </div>
  );
}
