import { useRef, useState } from "react";
import "./../styles/drawings.css";
import { useNavigate } from "react-router-dom";

export default function DrawingPage() {
  const canvasRef = useRef(null);
  const [drawingId, setDrawingId] = useState(null);
  const [aiImage, setAiImage] = useState(null);
  const [color, setColor] = useState("#000000");
  const [eraser, setEraser] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const navigate = useNavigate();

  const startDraw = (e) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();

    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
  };

  const endDraw = () => setIsDrawing(false);

  const draw = (e) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();

    ctx.lineWidth = eraser ? 20 : 3;
    ctx.lineCap = "round";
    ctx.strokeStyle = eraser ? "#ffffff" : color;

    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
  };

  const uploadDrawing = async () => {
    const base64Image = canvasRef.current.toDataURL("image/png");

    const res = await fetch("http://localhost:8080/api/drawings/upload", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: 1,
        base64Image
      })
    });

    const data = await res.json();
    setDrawingId(data.id);
    alert("Drawing saved!");
  };

  const recreateAI = async () => {
    if (!drawingId) {
      alert("Save drawing first!");
      return;
    }

    const res = await fetch(
      `http://localhost:8080/api/drawings/${drawingId}/recreate`,
      { method: "POST" }
    );

    const data = await res.json();
    setAiImage(`http://localhost:8080/${data.aiImagePath}`);
  };

  return (
    <div className="drawing-page">

      <div className="drawing-container">

        <div className="drawing-area">

          <div className="top-bar">
            <button className="back-btn" onClick={() => navigate("/home")}>
              ⬅ Back
            </button>

            <h2 style={{ color: "black" }}>Draw Your Picture 🎨</h2>
          </div>

          <canvas
            ref={canvasRef}
            width="550"
            height="400"
            onMouseDown={startDraw}
            onMouseUp={endDraw}
            onMouseMove={draw}
          />

          <input
            type="color"
            value={color}
            onChange={(e) => {
              setColor(e.target.value);
              setEraser(false);
            }}
          />

          <div className="buttons">
            <button onClick={clearCanvas}>Clear</button>
            <button onClick={uploadDrawing}>Save</button>
            <button onClick={recreateAI}>Recreate with AI</button>
          </div>
        </div>

        <div className="ai-area">
          <h2 style={{ color: "black" }}>AI Recreated Image 🤖</h2>
          {aiImage ? (
            <img width="500" height="500" src={aiImage} alt="AI Result" />
          ) : (
            <p style={{ color: "black" }}>AI image will appear here.</p>
          )}
        </div>

      </div>
    </div>
  );
}
