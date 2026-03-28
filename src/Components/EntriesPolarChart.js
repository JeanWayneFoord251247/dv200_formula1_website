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
  const getColor = (item) =>
    teamStyles[item.Constructor?.constructorId || item.constructorId]?.mainColor || "#E10600";

  const data = {
    labels: [
      activeTab === "drivers" ? slotA.familyName : slotA.name,
      activeTab === "drivers" ? slotB.familyName : slotB.name,
    ],
    datasets: [
      {
        data: [dataA, dataB],
        backgroundColor: [
          getColor(slotA) + "B3", // B3 is approx 70% opacity for that soft look
          getColor(slotB) + "B3",
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