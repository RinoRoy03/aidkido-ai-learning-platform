import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/signin.css";

export default function SignIn({ setUserId }) {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      if (!res.ok) {
        const msg = await res.text();
        alert(msg || "Invalid credentials");
        return;
      }

      // ✅ VERY IMPORTANT: read JSON not text
      const user = await res.json();

      /*
        backend should return:
        {
          id: 1,
          name: "...",
          email: "..."
        }
      */

      // ✅ save for entire app
      localStorage.setItem("userId", user.id);
      setUserId(user.id);
      localStorage.setItem("userEmail", user.email);

      alert("Login successful");

      navigate("/home");

    } catch (err) {
      console.error(err);
      alert("Server not running?");
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

      {/* Icons */}
      <img src="/images/fire.png" className="icon fire" alt="" />
      <img src="/images/spark.png" className="icon spark" alt="" />

      {/* Signin Box */}
      <div className="signin-box">
        <div className="signin-top-curve"></div>

        <h1 className="signin-title">
          Welcome<br />Back
        </h1>

        <form className="signin-form" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Your Email"
            className="signin-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="signin-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="signin-footer">
            <span className="signin-text">Sign in</span>
            <button type="submit" className="signin-btn">&#8594;</button>
          </div>
        </form> 

        <div className="signin-links">
          <Link to="/signup" className="signin-linksignup">
            Sign Up
          </Link>

          <Link to="/forgot-password" className="signin-link forgot">
  Forgot Password?
</Link>

        </div>
      </div>
    </section>
  );
}
