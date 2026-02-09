import React, { useEffect, useState } from "react";
import "../styles/cartoons.css";

export default function CartoonPage() {

  const [cartoons, setCartoons] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  // fetch cartoons from backend
  useEffect(() => {
    fetch("http://localhost:8080/api/cartoons")
      .then(res => res.json())
      .then(data => setCartoons(data));
  }, []);

  // group by category
  const grouped = cartoons.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <div className="body3">
    <div className="cartoon-layout">

      <a href="/home" className="back-button">⟵ Back</a>

      {/* Sidebar */}
      <div className="sidebar">
        {Object.keys(grouped).map(cat => (
          <details key={cat}>
            <summary>{cat}</summary>

            {grouped[cat].map(video => (
              <a
                href="#"
                key={video.id}
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedVideo(video.videoId);
                }}
              >
                {video.title}
              </a>
            ))}
          </details>
        ))}
      </div>

      {/* Content */}
      <div className="content">
        <h1 className="title">Cartoon Time 🎉</h1>

        <div className="video-box">
          {selectedVideo ? (
            <iframe
              src={`https://www.youtube.com/embed/${selectedVideo}`}
              allowFullScreen
              title="cartoon"
            />
          ) : (
            <div className="placeholder">
              Click on a cartoon to start watching!
            </div>
          )}
        </div>
      </div>
    </div>
    </div>
  );
}
