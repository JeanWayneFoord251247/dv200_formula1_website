import React, { useState } from "react";
import "../App.css";

function CompareToggle() {
  const [activeTab, setActiveTab] = useState("drivers");

  return (
    <div className="toggle-container">
      <div
        className={`slider ${activeTab === "constructors" ? "slide-right" : ""}`}
      ></div>

      <button
        className={`toggle-btn ${activeTab === "drivers" ? "active" : ""}`}
        onClick={() => setActiveTab("drivers")}
      >
        Compare Drivers
      </button>

      <button
        className={`toggle-btn ${activeTab === "constructors" ? "active" : ""}`}
        onClick={() => setActiveTab("constructors")}
      >
        Compare Constructors
      </button>
    </div>
  );
}

export default CompareToggle;
