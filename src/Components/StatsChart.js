import React, { useState, useEffect } from "react";
import axios from "axios";
import WinsPieChart from "./WinsPieChart";
import EntriesPolarChart from "./EntriesPolarChart";
import StatsBarChart from "./StatsBarChart";

const getJolpicaUrl = (id, category, tab) => {
  const type = tab === "drivers" ? "drivers" : "constructors";
  const base = `https://api.jolpi.ca/ergast/f1/${type}/${id}`;

  switch (category) {
    case "Wins":
      return `${base}/results/1.json?limit=1`;
    case "Race Entries":
      return `${base}/results.json?limit=1`;
    case "Fastest Laps":
      return `${base}/fastest/1/results.json?limit=1`;
    case "Points (2026)":
      const standings = tab === "drivers" ? "driverStandings" : "constructorStandings";
      return `https://api.jolpi.ca/ergast/f1/current/${standings}.json`;
    default:
      return `${base}/results.json?limit=1`;
  }
};

const parseStats = (res, category, id, tab) => {
  const data = res.data?.MRData;
  if (!data) return 0;

  if (category === "Points (2026)") {
    const list = tab === "drivers"
      ? data.StandingsTable?.StandingsLists?.[0]?.DriverStandings
      : data.StandingsTable?.StandingsLists?.[0]?.ConstructorStandings;

    const item = list?.find((i) =>
      tab === "drivers" ? i.Driver.driverId === id : i.Constructor.constructorId === id
    );
    return parseFloat(item?.points) || 0;
  }
  return parseInt(data.total) || 0;
};

const StatsChart = ({ slotA, slotB, activeCategory, activeTab }) => {
  const [dataValues, setDataValues] = useState({ a: 0, b: 0 });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      if (!slotA || !slotB) return;
      setLoading(true);

      const idA = activeTab === "drivers" ? slotA.driverId : slotA.constructorId;
      const idB = activeTab === "drivers" ? slotB.driverId : slotB.constructorId;

      try {
        const [resA, resB] = await Promise.all([
          axios.get(getJolpicaUrl(idA, activeCategory, activeTab)),
          axios.get(getJolpicaUrl(idB, activeCategory, activeTab)),
        ]);

        setDataValues({
          a: parseStats(resA, activeCategory, idA, activeTab),
          b: parseStats(resB, activeCategory, idB, activeTab),
        });
      } catch (err) {
        console.error("F1 Data Sync Error:", err);
        setDataValues({ a: 0, b: 0 });
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [activeCategory, slotA, slotB, activeTab]);


return (
  <div className="Chart-Wrapper" style={{ height: "400px", width: "100%", position: "relative" }}>

    {!loading && activeCategory === "Wins" && (
      <WinsPieChart 
        key={`pie-${slotA.driverId || slotA.constructorId}-${slotB.driverId || slotB.constructorId}`} 
        slotA={slotA} slotB={slotB} dataA={dataValues.a} dataB={dataValues.b} activeTab={activeTab} 
      />
    )}

    {!loading && activeCategory === "Race Entries" && (
      <EntriesPolarChart 
        key={`polar-${slotA.driverId || slotA.constructorId}-${slotB.driverId || slotB.constructorId}`} 
        slotA={slotA} slotB={slotB} dataA={dataValues.a} dataB={dataValues.b} activeTab={activeTab} 
      />
    )}

    {!loading && (activeCategory === "Points (2026)" || activeCategory === "Fastest Laps") && (
      <StatsBarChart 
        key={`bar-${activeCategory}-${slotA.driverId || slotA.constructorId}`}
        slotA={slotA} slotB={slotB} dataA={dataValues.a} dataB={dataValues.b} activeTab={activeTab} category={activeCategory} 
      />
    )}
  </div>
);
};

export default StatsChart;