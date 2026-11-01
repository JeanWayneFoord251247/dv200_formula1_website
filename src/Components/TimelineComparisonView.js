import React, { useEffect, useState } from "react";
import F1LineChart from "./F1LineChart";
import { teamStyles } from "../Data/TeamData";

const TimelineComparisonView = ({ selections, type, onBack }) => {
  const [activeStat, setActiveStat] = useState("wins");
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isCancelled = false; // Prevents race conditions when switching tabs rapidly
    const years = [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025];

    const getJolpicaTimelineUrl = (id, category, tab, year) => {
      const isDriver = tab === "drivers";

      switch (category) {
        case "wins":
        case "points": {
          const endpoint = isDriver ? "driverStandings" : "constructorStandings";
          return `https://api.jolpi.ca/ergast/f1/${year}/${endpoint}.json?limit=100`;
        }
        case "entries": {
          const entity = isDriver ? "drivers" : "constructors";
          return `https://api.jolpi.ca/ergast/f1/${year}/${entity}/${id}/results.json?limit=1`;
        }
        case "fastestLaps": {
          const entity = isDriver ? "drivers" : "constructors";
          return `https://api.jolpi.ca/ergast/f1/${year}/fastest/1/${entity}/${id}/results.json?limit=1`;
        }
        default:
          return "";
      }
    };

    const fetchData = async () => {
      setLoading(true);
      try {
        const isDriver = type === "drivers";
        const team0 = selections[0]?.constructorId || selections[0]?.Constructor?.constructorId;
        const team1 = selections[1]?.constructorId || selections[1]?.Constructor?.constructorId;
        const isSameTeam = isDriver && Boolean(team0 && team1 && team0 === team1);

        const datasets = await Promise.all(
          selections.map(async (item, index) => {
            if (!item) return null;

            const id = isDriver
              ? item.driverId?.toLowerCase()
              : item.constructorId?.toLowerCase();

            const teamId = item.constructorId || item.Constructor?.constructorId;
            const team = teamStyles[teamId];
            let color = team?.mainColor || "#00D2BE";
            const isSecondTeammate = isSameTeam && index > 0;

            if (isDriver && team) {
              if (team.drivers && team.drivers[id]) {
                color = team.drivers[id];
              } else if (isSecondTeammate && team.secondaryColor) {
                color = team.secondaryColor;
              }
            }

            // Fetch each year sequentially or safely parse
            const yearlyStats = await Promise.all(
              years.map(async (year) => {
                try {
                  const url = getJolpicaTimelineUrl(id, activeStat, type, year);
                  const res = await fetch(url);
                  if (!res.ok) return 0;
                  const json = await res.json();
                  const data = json.MRData;

                  if (activeStat === "wins" || activeStat === "points") {
                    const standingsList = data.StandingsTable?.StandingsLists?.[0];
                    if (!standingsList) return 0;

                    const list = isDriver
                      ? standingsList.DriverStandings
                      : standingsList.ConstructorStandings;

                    // Locate the EXACT driver/constructor in the standings array
                    const target = list?.find((entry) => {
                      const entryId = isDriver
                        ? entry.Driver?.driverId?.toLowerCase()
                        : entry.Constructor?.constructorId?.toLowerCase();
                      return entryId === id;
                    });

                    if (!target) return 0; // Racer didn't score points/compete that year
                    return activeStat === "wins"
                      ? parseInt(target.wins || 0, 10)
                      : parseFloat(target.points || 0);
                  }

                  // Entries and Fastest Laps read total from root
                  return parseInt(data.total || 0, 10);
                } catch (err) {
                  return 0;
                }
              })
            );

            return {
              label: isDriver ? item.familyName : item.name,
              data: yearlyStats,
              borderColor: color,
              backgroundColor: `${color}33`,
              borderDash: isSecondTeammate ? [6, 6] : [],
              pointBackgroundColor: color,
              fill: true,
              tension: 0.3,
            };
          })
        );

        if (!isCancelled) {
          setChartData({
            labels: years,
            datasets: datasets.filter((d) => d !== null),
          });
        }
      } catch (err) {
        console.error("Timeline Fetch Error:", err);
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isCancelled = true; 
    };
  }, [selections, activeStat, type]);

  return (
    <div className="Comparison-View">
      <div className="Pill-Bar">
        {["wins", "points", "entries", "fastestLaps"].map((stat) => (
          <button
            key={stat}
            className={`Pill-Item ${activeStat === stat ? "active" : ""}`}
            onClick={() => setActiveStat(stat)}
          >
            {stat.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="Chart-Wrapper-Timeline">
        {loading || !chartData ? (
          <div className="loader">SYNCHRONIZING WITH JOLPICA...</div>
        ) : (
          <F1LineChart chartData={chartData} />
        )}
      </div>

      <button className="btn-back" onClick={onBack}>
        BACK TO SELECTION
      </button>
    </div>
  );
};

export default TimelineComparisonView;