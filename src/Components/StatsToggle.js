
import React from "react";

const StatsToggle = ({ activeStat, setActiveStat }) => {
  const categories = ["Wins", "Race entries", "Fastest Laps", "Points"];

  return (
    <div className="stats-pill-container">
      {categories.map((cat) => (
        <button
          key={cat}
          className={`stats-pill ${activeStat === cat ? "active" : ""}`}
          onClick={() => setActiveStat(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default StatsToggle;