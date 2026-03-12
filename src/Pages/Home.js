import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import TrackOutline from"../Assets/img/Home Page (1).png"

function HomePage() {
  return (
    <> 
      <img
        src={TrackOutline}
        className="Track-Outline"
        alt="Topographic Background"
      />
      <main className="App-header">
        <div className="Hero-Wrapper">
          <h1 className="Home-Page-Text">The Ultimate</h1>

          <div className="Bottom-Line">
            <span className="F1-Text">F1</span>
            <span className="Showdown-Text">Showdown</span>
          </div>

          <p className="Hero-Subtext">
            Dive deep into Formula 1 statistics. Compare your favourite drivers
            and constructors head-to-head and explore a rich timeline of F1
            history.
          </p>

          <div className="Hero-Button-Group">
            <Link to="/Compare" className="Hero-Primary-Button">
              Start Comparing
            </Link>
            <Link to="/Timeline" className="Hero-Secondary-Button">
              Explore Timeline
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}

export default HomePage;
