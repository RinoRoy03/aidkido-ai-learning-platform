import { useState } from "react";

export default function MathQuiz() {
  const generate = () => {
    const a = Math.floor(Math.random()*10);
    const b = Math.floor(Math.random()*10);
    return { a, b, ans: a+b };
  };

  const [q, setQ] = useState(generate());
  const [input, setInput] = useState("");
  const [score, setScore] = useState(0);

  const check = () => {
    if (parseInt(input) === q.ans) setScore(score+1);
    setQ(generate());
    setInput("");
  };

  return (
    <div style={{textAlign:"center", padding:40}}>
      <h2>➕ Math Quiz</h2>
      <h1>{q.a} + {q.b} = ?</h1>

      <input value={input} onChange={(e)=>setInput(e.target.value)} />
      <button onClick={check}>Submit</button>

      <h3>Score: {score}</h3>
    </div>
  );
}
