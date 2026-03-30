import React, { useState } from "react";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import SpainOutline from "../Assets/img/Timeline Page.png";
import CompareToggle from "../Components/TimelineToggle";
import SelectionBar from "../Components/F1Dropdown";
import TimelineComparisonView from "../Components/TimelineComparisonView"
 
function TimelinePage({ drivers, constructors, isLoading }) {
  const [activeTab, setActiveTab] = useState("drivers");
  const [selections, setSelections] = useState([null, null, null, null, null]);
  const [isCompared, setIsCompared] = useState(false);
  const currentOptions = activeTab === "drivers" ? drivers : constructors;
  const handleToggle = (tab) => {
    setActiveTab(tab);
    setSelections([null, null, null, null, null]);
    setIsCompared(false);
  };

  const updateSlot = (item, index) => {
    const newSelections = [...selections];
    newSelections[index] = item;
    setSelections(newSelections);
  };

  const selectedCount = selections.filter((s) => s !== null).length;

  if (isLoading) return <div className="loader">Synchronizing History...</div>;

  return (
    <>
      <img
        src={SpainOutline}
        className="Track-Outline"
        alt="Topographic Background"
      />
      <main className="App-header">
        <div className="Hero-Wrapper">
          <div className="Bottom-Line">
            <span className="F1-Text">F1</span>
            <span className="Timeline-Text">Timeline</span>
          </div>

          <p className="Hero-Subtext">
            A journey through the history of Formula 1.
          </p>

          <div className="Compare-Toggle-Button">
            <CompareToggle activeTab={activeTab} setActiveTab={handleToggle} />
          </div>

          {!isCompared ? (
            <div className="Selection-Compare">
              <div className="Timeline-Grid">
                {selections.map((selectedItem, index) => (
                  <div key={index} className="Slot-Group">
                    <SelectionBar
                      options={currentOptions}
                      activeTab={activeTab}
                      selectedItem={selectedItem}
                      onSelect={(item) => updateSlot(item, index)}
                      placeholder={`Select ${activeTab === "drivers" ? "Driver" : "Constructor"} ${index + 1}`}
                    />
                  </div>
                ))}
              </div>

              <button
                className="btn-compare-main-timeline"
                disabled={selectedCount < 2}
                onClick={() => setIsCompared(true)}
              >
                COMPARE JOURNEY ({selectedCount}/5)
              </button>
            </div>
          ) : (
            <TimelineComparisonView
              selections={selections.filter((s) => s !== null)}
              type={activeTab}
              onBack={() => setIsCompared(false)}
            />
          )}
        </div>
      </main>
    </>
  );
}

export default TimelinePage;
