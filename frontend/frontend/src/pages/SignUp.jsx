import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/signup.css";

export default function SignUp() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8080/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, password })
      });

      // backend returns STRING, not JSON
      const message = await res.text();

      alert(message);

      if (res.ok) {
        navigate("/"); // go to login/home
      }

    } catch (err) {
      console.error(err);
      alert("Signup failed. Server not running?");
    }
  };

  return (
    <section className="hero">
      <h1 className="title">AIDKIDO</h1>

      <p className="tagline">
        Smart fun for little minds!
        <img src="/images/gift.png" className="icon gift" alt="gift" />
      </p>

      {/* Clouds */}
      <img src="/images/cloud1.png" className="cloud cloud1" alt="cloud" />
      <img src="/images/cloud2.png" className="cloud cloud2" alt="cloud" />
      <img src="/images/cloud1.png" className="cloud cloud3" alt="cloud" />
      <img src="/images/cloud2.png" className="cloud cloud4" alt="cloud" />

      {/* Phones */}
      <div className="phones">
        <img src="/images/phone1.png" className="phone phone-left" alt="phone1" />
        <img src="/images/phone2.png" className="phone phone-center" alt="phone2" />
        <img src="/images/phone3.png" className="phone phone-right" alt="phone3" />
      </div>

      {/* Icons */}
      <img src="/images/fire.png" className="icon fire" alt="fire" />
      <img src="/images/spark.png" className="icon spark" alt="spark" />

      <div className="signup-box">
        <div className="top-curve"></div>

        <h1 className="signup-title">
          Create<br />Account
        </h1>

        <form className="signup-form" onSubmit={handleSignup}>
          <input
            placeholder="Name"
            className="signup-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Your Email"
            className="signup-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="signup-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="signup-footer">
            <button type="submit" className="signup-btn">&#8594;</button>
            <span className="signup-text">Sign Up</span>
          </div>
        </form>

        <div className="bottom-curve">
          {/* ✅ FIXED (React Router instead of <a>) */}
          <Link to="/" className="signin-link">
            Sign In
          </Link>
        </div>
      </div>
    </section>
  );
}
