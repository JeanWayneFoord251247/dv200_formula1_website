import React from "react";
import { PolarArea } from "react-chartjs-2";
import { teamStyles } from "../Data/TeamData";
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

const EntriesPolarChart = ({ slotA, slotB, dataA, dataB, activeTab }) => {
  const isDriver = activeTab === "drivers";
  
const teamIdA = slotA?.Constructor?.constructorId || slotA?.constructorId;
  const teamIdB = slotB?.Constructor?.constructorId || slotB?.constructorId;
  const isSameTeam = isDriver && teamIdA && teamIdB && teamIdA === teamIdB;

  const getColor = (item, isSecondTeammate = false) => {
    if (!item) return "#E10600";
    const teamId = item.Constructor?.constructorId || item.constructorId;
    const team = teamStyles[teamId];
    if (!team) return "#E10600";

    if (isDriver) {
      if (team.drivers && team.drivers[item.driverId]) {
        return team.drivers[item.driverId];
      }
      if (isSecondTeammate && team.secondaryColor) {
        return team.secondaryColor;
      }
    }

    return team.mainColor || "#E10600";
  };

  const data = {
    labels: [
      activeTab === "drivers" ? slotA.familyName : slotA.name,
      activeTab === "drivers" ? slotB.familyName : slotB.name,
    ],
    datasets: [
      {
        data: [dataA, dataB],
        backgroundColor: [
          getColor(slotA, false) + "B3", // B3 is approx 70% opacity for that soft look
          getColor(slotB, isSameTeam) + "B3",
        ],
        borderColor: "#fff",
        borderWidth: 1,
        spacing: 10, // This creates the "gap" between the slices like in your image
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        grid: {
          color: "rgba(255, 255, 255, 0.2)", // Subtle white rings
          lineWidth: 1,
        },
        angleLines: {
          display: false,
          color: "rgba(255, 255, 255, 0.1)",
        },
        suggestedMin: 0,
        ticks: {
          display: false, // Set to true to see the 10, 20, 30... numbers
          color: "#444",
          backdropColor: "transparent", // Removes the box around numbers
          stepSize: 10,
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          color: "#fff",
          font: { family: "Space Grotesk", size: 14 },
        },
      },
    },
  };

  return <PolarArea data={data} options={options} />;
};

export default EntriesPolarChart;