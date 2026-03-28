import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./Components/navbar";
import HomePage from "./Pages/Home";
import Compare from "./Pages/Compare";
import Timeline from "./Pages/Timeline";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [drivers, setDrivers] = useState([]); /* This creates a storage slot for a list of racing drivers. It starts as an empty list []. When the app finishes fetching data from a database, setDrivers will fill this list. */
  const [constructors, setConstructors] = useState([]); /* Similar to the line above, this creates a storage slot for the racing teams (constructors). It also starts empty and will be filled later. */
  const [loading, setLoading] = useState(true); /* This creates a "True/False" switch. It starts as true (meaning "Yes, we are loading"). Once the data arrives, the code will flip this to false to hide the loading screen and show the actual content. */

  useEffect(() => { /* This tells React: "Run the code inside these brackets automatically as soon as the app opens on the user's screen."  */
    const fetchF1Data = async () => { /* This defines a special "asynchronous" function. The app keeps running while it waits for the data to come back. */
      try { /* This starts a "Safety" block. It says: "Try to do the following steps, but if the internet is down or the website is broken, don't crash the whole app." */
        setLoading(true); /* This officially turns on the "Please Wait" or loading spinner so the user knows something is happening. */
        const [driverResponse, constructorResponse] = await Promise.all([ /* Instead of asking for drivers, waiting, and then asking for teams, this sends both requests at the same time. It’s like ordering two pizzas at once to save time. */
          axios.get(
            "https://api.jolpi.ca/ergast/f1/current/driverStandings.json",
          ),
          axios.get("https://api.jolpi.ca/ergast/f1/current/constructors.json"),
        ]);

        const standingsLists = /* I am creating a nickname for a very long path so I don't have to type it again. */
          driverResponse.data.MRData.StandingsTable.StandingsLists[0] /* The data from the API is nested. This line goes into data, then MRData, then the StandingsTable, and finally grabs the list of DriverStandings. */
            .DriverStandings;
        const driverData = standingsLists.map((item) => ({ /* The .map function takes the messy list and says "For every single driver in this list, I want to create a cleaner version of them." */
          ...item.Driver, /* This takes all the basic driver info (like name, date of birth, and nationality) and copies it into the new, clean object. */
          Constructor: item.Constructors[0], /* In the raw data, teams are usually in a list. This line just grabs the first team they drive for and attaches it directly to the driver's profile for easy access. */
        }));

        const constructorData =
          constructorResponse.data.MRData.ConstructorTable.Constructors; /* This does the same as line 28 just with constructors */
        setDrivers(driverData); /* This takes the clean list of drivers I just "unpacked" and saves it into the app's permanent memory. */
        setConstructors(constructorData); /* This does the same for the racing teams (constructors), storing them so the app can display them later. */
      } catch (error) { /* If something went wrong (like the internet cutting out or the API being down), the code jumps straight here. */
        console.error("F1 Data Load Error:", error); /* This writes a secret message in the developer's "log book" (the console) explaining exactly what broke, so they can fix it later. */
      } finally { /* This block of code runs regardless of whether the data loading succeeded or failed. */
        setLoading(false); /* This flips the "Loading" switch to "Off." The "Please Wait" animation disappears, and the app finally shows the data (or an error message). */
      }
    };

    fetchF1Data(); /* This call the function I just made (line 17-44) */
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <div className="Pattern-Background-Layer"></div>

        <header className="Navigation-Bar">
          <NavBar />
        </header>

        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />

            <Route
              path="/Compare"
              element={
                <Compare
                  drivers={drivers}
                  constructors={constructors}
                  isLoading={loading}
                />
              }
            />

            <Route
              path="/Timeline"
              element={
                <Timeline drivers={drivers} constructors={constructors} />
              }
            />
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

export default App;
