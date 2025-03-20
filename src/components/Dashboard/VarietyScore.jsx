import { useTacoData } from '../../hooks/useTacoData';
import './VarietyScore.css';

const VarietyScore = () => {
  const { getVarietyScoreData } = useTacoData();
  
  const varietyScore = getVarietyScoreData();
  
  // Determine the indicator text and color based on the score
  const getIndicator = (score) => {
    if (score >= 80) return { text: 'Excellent', color: '#2ecc71' };
    if (score >= 60) return { text: 'Good', color: '#27ae60' };
    if (score >= 40) return { text: 'Average', color: '#f39c12' };
    if (score >= 20) return { text: 'Limited', color: '#e67e22' };
    return { text: 'Poor', color: '#e74c3c' };
  };
  
  const indicator = getIndicator(varietyScore);
  
  return (
    <div className="variety-score metric-card">
      <h2 className="metric-title">Variety Score</h2>
      <div className="score-section">
        <div className="score-value">{varietyScore}%</div>
        <div 
          className="score-indicator" 
          style={{ color: indicator.color }}
        >
          {indicator.text}
        </div>
      </div>
    </div>
  );
};

export default VarietyScore;