import React, { useEffect, useState } from "react";
import "../styles/games.css";
import { useNavigate } from "react-router-dom";


export default function Games() {

  const [games, setGames] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const navigate = useNavigate();


  // fetch all games
  useEffect(() => {
    fetch("http://localhost:8080/api/games")
      .then(res => res.json())
      .then(data => setGames(data));
  }, []);

  // fetch AI recommendations
  useEffect(() => {
    fetch("http://localhost:8080/api/games/recommend?age=7")
      .then(res => res.json())
      .then(data => setRecommended(data));
  }, []);

  const startGame = (type) => {
    navigate(`/play/${type}`);


    // later you can route like:
    // navigate(`/game/${type}`)
  };

  return (
    <div className="body2">
    <div className="games-container">

      <a href="/home" className="back-button">⟵ Back</a>

      <h1 className="games-title">🎮 Games for You</h1>

      {/* ALL GAMES */}
      <div className="game-grid">
        {games.map((g) => (
          <div key={g.id} className="game-card">
            <h2>{g.icon} {g.name}</h2>
            <p>{g.description}</p>
            <span className={`tag ${g.level}`}>{g.level}</span>
            <button onClick={() => startGame(g.type)}>Play Now</button>
          </div>
        ))}
      </div>

      {/* AI RECOMMEND */}
      <h2 className="personal-title">🧠 Personalized Suggestions (AI)</h2>

      <div className="personalized-games">
        {recommended.map((g) => (
          <div key={g.id} className="game-card">
            <h2>{g.icon} {g.name}</h2>
            <p>{g.description}</p>
            <span className={`tag ${g.level}`}>{g.level}</span>
            <button onClick={() => startGame(g.type)}>Play Now</button>
          </div>
        ))}
      </div>

    </div>
    </div>
  );
}
