import React, { useEffect, useState } from "react";
import F1LineChart from "./F1LineChart";
import { teamStyles } from "../Data/TeamData";

const TimelineComparisonView = ({ selections, type, onBack }) => {
  const [activeStat, setActiveStat] = useState("wins");
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const years = [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025];

    const getJolpicaTimelineUrl = (id, category, tab, year) => {
      const endpointType = tab === "drivers" ? "drivers" : "constructors";
      const standingsType =
        tab === "drivers" ? "driverStandings" : "constructorStandings";
      const base = `https://api.jolpi.ca/ergast/f1/${year}/${endpointType}/${id}`;

      switch (category) {
        case "wins":
        case "points":
          return `${base}/${standingsType}.json`;
        case "entries":
          return `${base}/results.json?limit=1`;
        case "fastestLaps":
          return `${base}/fastest/1/results.json?limit=1`;
        default:
          return `${base}/${standingsType}.json`;
      }
    };

    const fetchData = async () => {
      setLoading(true);
      try {
        const datasets = await Promise.all(
          selections.map(async (item) => {
            if (!item) return null;

            const id =
              type === "drivers"
                ? item.driverId.toLowerCase()
                : item.constructorId.toLowerCase();
            const teamId =
              item.constructorId || item.Constructor?.constructorId;
            const color = teamStyles[teamId]?.mainColor || "#00D2BE";

            const yearlyStats = await Promise.all(
              years.map(async (year) => {
                try {
                  const url = getJolpicaTimelineUrl(id, activeStat, type, year);
                  const res = await fetch(url);
                  const json = await res.json();
                  const data = json.MRData;

                  if (activeStat === "wins" || activeStat === "points") {
                    const list = data.StandingsTable?.StandingsLists[0];
                    const entry =
                      type === "drivers"
                        ? list?.DriverStandings?.[0]
                        : list?.ConstructorStandings?.[0];

                    if (!entry) return 0;
                    return activeStat === "wins"
                      ? parseInt(entry.wins || 0)
                      : parseFloat(entry.points || 0);
                  }

                  return parseInt(data.total || 0);
                } catch (err) {
                  return 0; // Return 0 for years where data fails
                }
              }),
            );

            return {
              label: type === "drivers" ? item.familyName : item.name,
              data: yearlyStats,
              borderColor: color,
              backgroundColor: `${color}33`,
              fill: true,
              tension: 0.3,
            };
          }),
        );

        // Filter out any null entries from empty slots
        setChartData({
          labels: years,
          datasets: datasets.filter((d) => d !== null),
        });
      } catch (err) {
        console.error("Timeline Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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
