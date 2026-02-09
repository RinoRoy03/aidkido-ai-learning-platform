import { useState } from "react";

export default function PuzzleGame() {
  const colors = ["red","blue","green","orange","purple","yellow"];

  const [target, setTarget] = useState(colors[Math.floor(Math.random()*6)]);
  const [score, setScore] = useState(0);

  const clickColor = (c) => {
    if (c === target) {
      setScore(score + 1);
      setTarget(colors[Math.floor(Math.random()*6)]);
    }
  };

  return (
    <div style={{ textAlign:"center", padding:40 }}>
      <h2>🧩 Puzzle Blocks</h2>
      <h3>Click: {target.toUpperCase()}</h3>
      <h3>Score: {score}</h3>

      <div style={{display:"grid",gridTemplateColumns:"repeat(3,100px)",gap:20,justifyContent:"center"}}>
        {colors.map(c => (
          <div
            key={c}
            onClick={()=>clickColor(c)}
            style={{height:100, background:c, borderRadius:12, cursor:"pointer"}}
          />
        ))}
      </div>
    </div>
  );
}
