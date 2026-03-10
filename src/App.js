import "./App.css";
import homePage from "./Assets/img/Home Page.png";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./Components/navbar";


function App() {
  return (
    <div className="App">
      <div className="App">
        <img
          src={homePage}
          className="Home-Page"
          alt="Topographic Background"
        />
        <header className="Navigation-Bar">
          <NavBar />
        </header>

        <main className="App-header">
          <div className="Hero-Wrapper">
            <h1 className="Home-Page-Text">The Ultimate</h1>

            <div className="Bottom-Line">
              <span className="F1-Text">F1</span>
              <span className="Showdown-Text">Showdown</span>
            </div>

            <p className="Hero-Subtext">
              Dive deep into Formula 1 statistics. Compare your favourite
              drivers and constructors head-to-head and explore a rich timeline
              of F1 history.
            </p>

            <div className="Hero-Button-Group">
              <button className="Hero-Primary-Button">Start Comparing</button>
              <button className="Hero-Secondary-Button">
                Explore Timeline
              </button>
            </div>
          </div>
        </main>

        <footer className="Footer-Info">
          <div className="Footer-Text">
            Powered by the Jolpica F1 API. All data is for informational
            purposes only.
            <br />© 2026 GridCompare. All rights reserved.
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
