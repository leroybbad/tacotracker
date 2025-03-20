import { useTacoData } from '../../hooks/useTacoData';
import { getRecentTacoCount } from '../../utils/metrics';
import './TacoCounter.css';

const TacoCounter = () => {
  const { tacos } = useTacoData();
  
  const totalCount = tacos.length;
  const recentCount = getRecentTacoCount(tacos);
  
  return (
    <div className="taco-counter metric-card">
      <h2 className="metric-title">Taco Count</h2>
      <div className="counter-section">
        <div className="total-count">{totalCount}</div>
        <div className="recent-count">Last 30 days: {recentCount}</div>
      </div>
    </div>
  );
};

export default TacoCounter;