import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import MonzaOutline from"../Assets/img/Monza.png"
import CompareToggle from "../Components/ToggleSwitch"

function ComparePage() {
  return (
    <> 
      <img
        src={MonzaOutline}
        className="Track-Outline"
        alt="Topographic Background"
      />
      <main className="App-header">
        <div className="Hero-Wrapper">

          <div className="Bottom-Line">
            <span className="F1-Text">F1</span>
            <span className="Comparison-Text">Comparison Engine</span>
          </div>

          <p className="Hero-Subtext">
            Select two drivers or constructors to see a side-by-side comparison of their stats and get an AI-powered analysis.
          </p>

          <div className="Compare-Toggle-Button">
            <CompareToggle/>
          </div>
        </div>
      </main>
    </>
  );
}

export default ComparePage;
