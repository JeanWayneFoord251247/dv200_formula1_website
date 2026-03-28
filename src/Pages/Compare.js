import React, { useState } from "react";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import MonzaOutline from "../Assets/img/Monza.png";
import MonacoOutline from "../Assets/img/Monaco.png";
import CompareToggle from "../Components/CompareToggle";
import SelectionBar from "../Components/F1Dropdown";
import ComparisonView from "../Components/comparisonView";

function ComparePage({ drivers, constructors, isLoading }) {
  const [activeTab, setActiveTab] = useState("drivers");
  const [selection, setSelection] = useState({ slotA: null, slotB: null });
  const [isCompared, setIsCompared] = useState(false);

  const currentOptions = activeTab === "drivers" ? drivers : constructors;

  const handleToggle = (tab) => {
    setActiveTab(tab);
    setSelection({ slotA: null, slotB: null });
    setIsCompared(false);
  };

  if (isLoading) return <div className="loader">Synchronizing with FIA Data...</div>;

  return (
    <>
      <img
        src={activeTab === "drivers" ? MonzaOutline : MonacoOutline}
        className="Track-Outline"
        alt="Track Background"
      />

      <main className="App-header">
        <div className="Hero-Wrapper">
          <div className="Bottom-Line">
            <span className="F1-Text">F1</span>
            <span className="Comparison-Text">Comparison Engine</span>
          </div>

          <p className="Hero-Subtext">Select two {activeTab} for a side-by-side comparison.</p>

          <div className="Compare-Toggle-Button">
            <CompareToggle activeTab={activeTab} setActiveTab={handleToggle} />
          </div>

          {!isCompared ? (
            
            <div className="Selection-Compare">
              <SelectionBar
                options={currentOptions}
                activeTab={activeTab}
                selectedItem={selection.slotA}
                onSelect={(item) => setSelection((p) => ({ ...p, slotA: item }))}
                placeholder={`Select ${activeTab === "drivers" ? "Driver" : "Constructor"} 1`}
              />

              <button
                className="btn-compare-main"
                disabled={!selection.slotA || !selection.slotB}
                onClick={() => setIsCompared(true)}
              >
                COMPARE
              </button>

              <SelectionBar
                options={currentOptions}
                activeTab={activeTab}
                selectedItem={selection.slotB}
                onSelect={(item) => setSelection((p) => ({ ...p, slotB: item }))}
                placeholder={`Select ${activeTab === "drivers" ? "Driver" : "Constructor"} 2`}
              />
            </div>
          ) : (
            
            <ComparisonView 
              selection={selection} 
              activeTab={activeTab} 
              onBack={() => setIsCompared(false)} 
            />
          )}
        </div>
      </main>
    </>
  );
}

export default ComparePage;