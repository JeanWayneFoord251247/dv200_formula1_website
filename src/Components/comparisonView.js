import React, { useState } from "react";
import ResultCard from "./resultCard";
import StatsChart from "./StatsChart"; 
import "../App.css";

const ComparisonView = ({ selection, activeTab, onBack}) => { /* It accepts three "props" (inputs): the items being compared, the current tab, and a way to go back.*/
  const [activeCategory, setActiveCategory] = useState("Wins"); /* This tells the app to "Keep track of which category is selected." It starts with Wins as the default. If the user clicks something else, setActiveCategory updates that memory.*/
  const categories = [ /* This starts a list (an array) of the specific stat types i want to show on the screen. */
    "Wins",
    "Race Entries",
    "Fastest Laps",
    "Points (2026)" 
  ];

  return (
    <div className="Results-Wrapper mt-5">
      <button className="btn-back" onClick={onBack}>Back</button>

      <div className="Comparison-Grid">
        <ResultCard item={selection.slotA} activeTab={activeTab} />
        <div className="vs-divider">VS</div>
        <ResultCard item={selection.slotB} activeTab={activeTab} />
      </div>

      <div className="Pill-Bar-Wrapper">
        <div className="Pill-Bar">
          {categories.map((cat) => (/* cat is short for category */
            <button
              key={cat}
              className={`Pill-Item ${activeCategory === cat ? "active" : ""}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="Stats-Showcase-Container">
        <h2 className="Stat-Focus-Title">{activeCategory}</h2>
        <div className="Chart-Area">
          <StatsChart 
            slotA={selection.slotA} 
            slotB={selection.slotB} 
            activeCategory={activeCategory} 
            activeTab={activeTab}
          />
        </div>
      </div>
    </div>
  );
};

export default ComparisonView;