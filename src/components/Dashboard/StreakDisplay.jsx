import { useTacoData } from '../../hooks/useTacoData';
import './StreakDisplay.css';

const StreakDisplay = () => {
  const { getStreakData } = useTacoData();
  
  const streakDays = getStreakData();
  
  // Get encouraging message based on streak length
  const getStreakMessage = (days) => {
    if (days === 0) return "No active streak. Eat a taco today!";
    if (days === 1) return "First day of your streak!";
    if (days < 3) return "Good start! Keep it going!";
    if (days < 7) return "Impressive streak!";
    if (days < 14) return "You're on fire!";
    if (days < 30) return "Taco master!";
    return "Legendary taco streak!";
  };
  
  return (
    <div className="streak-display metric-card">
      <h2 className="metric-title">Taco Streak</h2>
      <div className="streak-section">
        <div className="streak-count">
          <span className="streak-value">{streakDays}</span>
          <span className="streak-label">days</span>
        </div>
        <div className="streak-message">{getStreakMessage(streakDays)}</div>
      </div>
    </div>
  );
};

export default StreakDisplay;