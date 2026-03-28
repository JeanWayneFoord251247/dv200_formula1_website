import { Bar } from "react-chartjs-2";
import { teamStyles } from "../Data/TeamData";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend); /* This picks out the specific parts like bars and tooltips needed to build the chart. */

const StatsBarChart = ({ slotA, slotB, dataA, dataB, activeTab, category }) => {/* This is A template that takes two competitors and their stats to show who is leading. */
  const getColor = (item) => teamStyles[item.Constructor?.constructorId || item.constructorId]?.mainColor || "#E10600"; /* This looks up the official team color so each bar matches the car's actual paint job. */
  const data = {
    labels: [activeTab === "drivers" ? slotA.familyName : slotA.name, activeTab === "drivers" ? slotB.familyName : slotB.name], /* This picks driver last names or team names based on which tab you are viewing. */
    datasets: [{ /* This groups the numbers with the colors so the chart knows what to draw. */
      label: category,
      data: [dataA, dataB],
      backgroundColor: [getColor(slotA), getColor(slotB)],
    }]
  };

  const options = { /* It forces the text to be white and the grid lines to be faint for a dark theme. */
    scales: {
      y: { ticks: { color: "#fff" }, grid: { color: "rgba(255,255,255,0.1)" } },
      x: { ticks: { color: "#fff" } }
    }
  };

  return <Bar data={data} options={options} />; /* This is the final step that actually paints the interactive chart on the screen. */
};
export default StatsBarChart;