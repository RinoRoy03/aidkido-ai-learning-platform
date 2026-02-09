import React from "react";
import "../styles/home.css";
import RobotChatbot from "./RobotChatbot";
import { Link } from "react-router-dom";

export default function Home({ logout }) {

  // ✅ use parent logout (DO NOT remove localStorage here)
  const handleLogout = () => {
    logout();
  };

  return (
    <div className="body1">

      <section className="hero">

        {/* Top Navigation */}
        <div className="top-nav">
          <div className="logo">AIDKIDO</div>

          <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
            <Link to="/about">About</Link>

            {/* ✅ Logout */}
            <button
              className="logout-btn"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>


        {/* Clouds */}
        <img src="/images/cloud1.png" className="cloud cloud1" alt="" />
        <img src="/images/cloud2.png" className="cloud cloud2" alt="" />
        <img src="/images/cloud1.png" className="cloud cloud3" alt="" />
        <img src="/images/cloud2.png" className="cloud cloud4" alt="" />


        {/* Phones */}
        <div className="phones">
          <img src="/images/phone1.png" className="phone phone-left" alt="" />
          <img src="/images/phone2.png" className="phone phone-center" alt="" />
          <img src="/images/phone3.png" className="phone phone-right" alt="" />
        </div>


        {/* Menu Buttons */}
        <div className="menu-buttons">
          <Link to="/cartoons" className="menu-button">Cartoons</Link>
          <Link to="/drawings" className="menu-button">Drawings</Link>
          <Link to="/games" className="menu-button">Games</Link>
        </div>


        {/* Decorative Icons */}
        <img src="/images/fire.png" className="icon fire" alt="" />
        <img src="/images/spark.png" className="icon spark" alt="" />


        {/* Chatbot */}
        <RobotChatbot />

      </section>

    </div>
  );
}
