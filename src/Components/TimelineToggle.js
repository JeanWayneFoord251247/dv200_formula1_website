import React from "react";
import "../App.css";

function TimelineToggle({ activeTab, setActiveTab }) {
  return (
    <div className="toggle-container">
      <div
        className={`slider ${activeTab === "constructors" ? "slide-right" : ""}`}
      ></div>

      <button
        className={`toggle-btn ${activeTab === "drivers" ? "active" : ""}`}
        onClick={() => setActiveTab("drivers")}
      >
        Drivers Timeline
      </button>

      <button
        className={`toggle-btn ${activeTab === "constructors" ? "active" : ""}`}
        onClick={() => setActiveTab("constructors")}
      >
        Constructors Timeline
      </button>
    </div>
  );
}

export default TimelineToggle;