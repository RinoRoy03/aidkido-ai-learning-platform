import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import DrawingPage from "./pages/DrawingPage";
import CartoonPage from "./pages/CartoonPage";
import Games from "./pages/Games";
import Home from "./pages/Home";
import About from "./pages/About";
import GamePlayer from "./pages/GamePlayer";
import PuzzleGame from "./pages/PuzzleGame";
import MathQuiz from "./pages/MathQuiz";
import MemoryGame from "./pages/MemoryGame";
import ColorRun from "./pages/ColorRun";


/* ==========================
   CONFIG
========================== */

const DAILY_LIMIT = 30 * 60;
const WARNING_TIME = 5 * 60;


/* ==========================
   MAIN APP
========================== */

export default function App() {
  return (
    <BrowserRouter>
      <TimerWrapper />
    </BrowserRouter>
  );
}


/* ==========================
   TIMER WRAPPER
========================== */

function TimerWrapper() {

  const navigate = useNavigate();

  // ✅ React controlled auth state
  const [userId, setUserId] = useState(
    () => localStorage.getItem("userId")
  );

  const [remaining, setRemaining] = useState(DAILY_LIMIT);


  /* ==========================
     TIMER LOGIC
  ========================== */
  useEffect(() => {

    // ❌ no login → stop timer
    if (!userId) return;

    const timer = setInterval(async () => {

      const res = await fetch(
        `http://localhost:8080/api/time/tick/${userId}`,
        { method: "POST" }
      );

      const secondsLeft = await res.json();

      setRemaining(secondsLeft);


      /* warning */
      if (secondsLeft === WARNING_TIME) {
        alert("⚠ Only 5 minutes left today!");
      }


      /* finished */
      if (secondsLeft <= 0) {

        alert("⛔ Time finished for today!");

        localStorage.removeItem("userId");
        setUserId(null);        // ✅ THIS instantly stops timer

        navigate("/");
        clearInterval(timer);
      }

    }, 1000);


    return () => clearInterval(timer);

  }, [userId, navigate]);


  /* ==========================
     LOGOUT FUNCTION
  ========================== */
  const logout = () => {
    localStorage.removeItem("userId");
    setUserId(null); // ✅ stop timer immediately
    navigate("/");
  };


  return (
    <>
      {userId && <TimerBar seconds={remaining} />}

      <Routes>
        <Route path="/" element={<SignIn setUserId={setUserId} />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home logout={logout} />} />
        <Route path="/drawings" element={<DrawingPage />} />
        <Route path="/cartoons" element={<CartoonPage />} />
        <Route path="/games" element={<Games />} />
        <Route path="/about" element={<About />} />
        <Route path="/play/:type" element={<GamePlayer />} />
        <Route path="/play/logic" element={<PuzzleGame />} />
        <Route path="/play/education" element={<MathQuiz />} />
        <Route path="/play/brain" element={<MemoryGame />} />
        <Route path="/play/action" element={<ColorRun />} />
      </Routes>
    </>
  );
}


/* ==========================
   TIMER BAR
========================== */

function TimerBar({ seconds }) {

  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;

  return (
    <div style={{
      position: "fixed",
      top: 0,
      width: "100%",
      background: "#ff6b6b",
      color: "white",
      textAlign: "center",
      padding: "8px",
      fontWeight: "bold",
      zIndex: 9999
    }}>
      ⏳ Daily Screen Time Left: {min}:{sec.toString().padStart(2, "0")}
    </div>
  );
}
