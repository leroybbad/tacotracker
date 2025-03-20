import TacoCounter from './TacoCounter';
import VarietyScore from './VarietyScore';
import StreakDisplay from './StreakDisplay';
import WeeklyChallenge from './WeeklyChallenge';
import FlavorRadar from './FlavorRadar';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <TacoCounter />
      <VarietyScore />
      <StreakDisplay />
      <WeeklyChallenge />
      <FlavorRadar />
    </div>
  );
};

export default Dashboard;