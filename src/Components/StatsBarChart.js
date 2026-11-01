import { Bar } from 'react-chartjs-2';
import { teamStyles } from '../Data/TeamData';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
); 

const StatsBarChart = ({ slotA, slotB, dataA, dataB, activeTab, category }) => {
  const isDriver = activeTab === 'drivers';

  const teamIdA = slotA?.Constructor?.constructorId || slotA?.constructorId;
  const teamIdB = slotB?.Constructor?.constructorId || slotB?.constructorId;
  const isSameTeam = isDriver && teamIdA && teamIdB && teamIdA === teamIdB;

  const getColor = (item, isSecondTeammate = false) => {
    if (!item) return '#E10600';
    const teamId = item.Constructor?.constructorId || item.constructorId;
    const team = teamStyles[teamId];
    if (!team) return '#E10600';

    if (isDriver) {
      if (team.drivers && team.drivers[item.driverId]) {
        return team.drivers[item.driverId];
      }
      if (isSecondTeammate && team.secondaryColor) {
        return team.secondaryColor;
      }
    }

    return team.mainColor || '#E10600';
  };

  const data = {
    labels: [
      activeTab === 'drivers' ? slotA.familyName : slotA.name,
      activeTab === 'drivers' ? slotB.familyName : slotB.name,
    ],
    datasets: [
      {
        label: category,
        data: [dataA, dataB],
        backgroundColor: [getColor(slotA, false) + "B3", getColor(slotB, isSameTeam) + "B3"],
      },
    ],
  };

  const options = {
    /* It forces the text to be white and the grid lines to be faint for a dark theme. */
    scales: {
      y: { ticks: { color: '#fff' }, grid: { color: 'rgba(255,255,255,0.1)' } },
      x: { ticks: { color: '#fff' } },
    },
  };

  return (
    <Bar data={data} options={options} />
  ); /* This is the final step that actually paints the interactive chart on the screen. */
};
export default StatsBarChart;
