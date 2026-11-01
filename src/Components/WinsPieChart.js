import { Pie } from 'react-chartjs-2';
import { teamStyles } from '../Data/TeamData';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, RadialLinearScale } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, RadialLinearScale);

const WinsPieChart = ({ slotA, slotB, dataA, dataB, activeTab }) => {
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
        data: [dataA, dataB],
        backgroundColor: [getColor(slotA, false) + "B3", getColor(slotB, isSameTeam) + "B3"],
        borderColor: 'rgba(255,255,255,0.2)',
        borderWidth: 2,
      },
    ],
  };

  return <Pie data={data} options={{ responsive: true, maintainAspectRatio: false }} />;
};
export default WinsPieChart;
