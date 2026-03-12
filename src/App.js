import "./App.css";
import homePage from "./Assets/img/Home Page.png";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./Components/navbar";
import HomePage from "./Pages/Home";
import Compare from "./Pages/Compare";
import Timeline from "./Pages/Timeline";
import { BrowserRouter, Routes, Route, } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <img
          src={homePage}
          className="Home-Page"
          alt="Topographic Background"
        />
        
        <header className="Navigation-Bar">
          <NavBar />
        </header>

        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/Compare" element={<Compare />} />
            <Route path="/Timeline" element={<Timeline />} />
          </Routes>
        </main>

        <footer className="Footer-Info">
          <div className="Footer-Text">
            Powered by the Jolpica F1 API. All data is for informational
            purposes only.
            <br />© 2026 GridCompare. All rights reserved.
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

// I could not figure out why my "link to" tags wont work when i figured out i 
// should not rap my component in a BrowserRouter but i should do it in my App.js

//My App.js should only contain what should be on all pages

export default App;