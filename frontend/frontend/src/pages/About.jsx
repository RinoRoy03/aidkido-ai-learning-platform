import React from "react";
import { Link } from "react-router-dom";
import "../styles/about.css";

export default function About() {
  return (
    <div className="about-page">

      {/* Back button */}
      <Link to="/home" className="back-button">⟵ Back</Link>

      <section className="about-section">

        <h1>About AidKido</h1>

        <p>
          <strong>AidKido</strong> is a fun, interactive learning platform created especially for children!
          It combines creativity, entertainment, and learning — all in one safe and engaging environment.
        </p>

        <h2>✨ What’s Inside?</h2>

        <ul>
          <li><strong>Smart Games:</strong> Boost your brain with playful puzzles and AI-powered challenges!</li>
          <li><strong>Drawing Fun:</strong> Kids can draw freely, and our AI adds a magical twist to their art.</li>
          <li><strong>Cartoon Time:</strong> Watch safe cartoons in a kid-friendly interface.</li>
          <li><strong>Screen Time Control:</strong> Enjoy responsibly with built-in 25-minute limits.</li>
        </ul>

        <h2>🧠 Why AI?</h2>
        <p>
          AI suggests personalized games and recreates children's drawings — making every experience unique.
        </p>

        <h2>👨‍💻 Developer</h2>
        <p>
          Developed and maintained by <strong>Rino Roy</strong>, focused on building meaningful digital experiences for kids.
        </p>

        <h2>📩 Contact</h2>
        <p>
          Email:{" "}
          <a href="mailto:rinoroyanithottathil@gmail.com">
            rinoroyanithottathil@gmail.com
          </a>
        </p>

        <p className="version">AidKido v1.0</p>

      </section>
    </div>
  );
}
