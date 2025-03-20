import { useTacoData } from '../../hooks/useTacoData';
import './WeeklyChallenge.css';

const WeeklyChallenge = () => {
  const { getWeeklyChallengeData } = useTacoData();
  
  const challenge = getWeeklyChallengeData();
  
  if (!challenge) {
    return (
      <div className="weekly-challenge metric-card">
        <h2 className="metric-title">Weekly Challenge</h2>
        <div className="challenge-loading">Loading challenge...</div>
      </div>
    );
  }
  
  const { description, progress, target } = challenge;
  const progressPercentage = Math.min((progress / target) * 100, 100);
  
  return (
    <div className="weekly-challenge metric-card">
      <h2 className="metric-title">Weekly Challenge</h2>
      <div className="challenge-content">
        <p className="challenge-description">{description}</p>
        
        <div className="challenge-progress-container">
          <div 
            className="challenge-progress-bar"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        
        <div className="challenge-stats">
          <span className="challenge-progress-text">
            {progress} of {target} completed
          </span>
          {progressPercentage === 100 && (
            <span className="challenge-completed">🎉 Challenge completed!</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default WeeklyChallenge;