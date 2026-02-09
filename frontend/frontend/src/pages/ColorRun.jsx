import { useState, useEffect } from "react";

export default function ColorRun() {
  const [score,setScore] = useState(0);
  const [time,setTime] = useState(15);

  useEffect(()=>{
    if(time>0){
      const t=setTimeout(()=>setTime(time-1),1000);
      return ()=>clearTimeout(t);
    }
  },[time]);

  return (
    <div style={{textAlign:"center", padding:40}}>
      <h2>🏃 Color Run</h2>
      <h3>Time: {time}</h3>
      <h3>Score: {score}</h3>

      {time>0 ? (
        <button
          style={{fontSize:30,padding:30}}
          onClick={()=>setScore(score+1)}
        >
          CLICK FAST!
        </button>
      ) : (
        <h2>Game Over 🎉 Final Score: {score}</h2>
      )}
    </div>
  );
}
