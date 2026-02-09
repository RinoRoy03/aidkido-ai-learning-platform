import React, { useState } from "react";
import "../styles/robotChatbot.css";

export default function RobotChatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);
  const [avatar, setAvatar] = useState("/images/robot-idle.gif");

  const openChat = () => {
    setOpen(true);

    setAvatar("/images/robot-wave.gif");
    setTimeout(() => {
      setAvatar("/images/robot-idle.gif");
    }, 2000);
  };

  const appendMessage = (role, text) => {
    setMessages((prev) => [...prev, { role, text }]);
  };

 
const sendMessage = async (e) => {
  e.preventDefault();

  if (!input.trim()) return;

  const userText = input;

  appendMessage("user", userText);
  setInput("");

  try {
    const response = await fetch("http://localhost:8080/api/chat", {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: userText
    });

    const reply = await response.text();

    appendMessage("bot", reply);

  } catch {
    appendMessage("bot", "Oops, I'm sleepy. Try again later!");
  }
};


  return (
    <div className="robot-bot">
      <img src={avatar} id="robotAvatar" alt="Robot" />

      <div className="chat-bubble" onClick={openChat}>
      👋 Tap to Chat!
      </div>

      {open && (
        <div className="chat-box">
          <div className="chat-area">
            {messages.map((msg, index) => (
              <div key={index} className={msg.role}>
                {msg.text}
              </div>
            ))}
          </div>

          <form onSubmit={sendMessage}>
            <input
              type="text"
              placeholder="Say something..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </form>
        </div>
      )}
    </div>
  );
}
