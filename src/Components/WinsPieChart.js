import { Pie } from "react-chartjs-2";
import { teamStyles } from "../Data/TeamData";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, RadialLinearScale } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, RadialLinearScale);

const WinsPieChart = ({ slotA, slotB, dataA, dataB, activeTab }) => {
  const getColor = (item) => teamStyles[item.Constructor?.constructorId || item.constructorId]?.mainColor || "#E10600";
  
  const data = {
    labels: [activeTab === "drivers" ? slotA.familyName : slotA.name, activeTab === "drivers" ? slotB.familyName : slotB.name],
    datasets: [{
      data: [dataA, dataB],
      backgroundColor: [getColor(slotA), getColor(slotB)],
      borderColor: "rgba(255,255,255,0.2)",
      borderWidth: 2,
    }]
  };

  return <Pie data={data} options={{ responsive: true, maintainAspectRatio: false }} />;
};
export default WinsPieChart;


