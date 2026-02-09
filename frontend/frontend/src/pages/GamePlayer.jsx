import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function GamePlayer() {
  const { type } = useParams();
  const [game, setGame] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/api/games")
      .then(res => res.json())
      .then(data => {
        const selected = data.find(g => g.type === type);
        setGame(selected);
      });
  }, [type]);

  if (!game) return <h2>Loading game...</h2>;

  return (
    <div style={{ height: "100vh" }}>
      <h2 style={{ textAlign: "center" }}>{game.name}</h2>

      <iframe
        src={game.url}
        title={game.name}
        width="100%"
        height="90%"
        style={{ border: "none" }}
      />
    </div>
  );
}
