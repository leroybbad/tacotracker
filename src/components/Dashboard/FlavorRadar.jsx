import { useTacoData } from '../../hooks/useTacoData';
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer } from 'recharts';
import './FlavorRadar.css';

const FlavorRadar = () => {
  const { getFlavorProfile } = useTacoData();
  
  const flavorProfile = getFlavorProfile();
  
  // Format data for the radar chart
  const formatChartData = (profile) => {
    const { proteins, spiceLevel, toppingVariety, preparationStyles } = profile;
    
    return [
      {
        subject: 'Beef',
        value: proteins.beef || 0,
        fullMark: 100,
      },
      {
        subject: 'Chicken',
        value: proteins.chicken || 0,
        fullMark: 100,
      },
      {
        subject: 'Pork',
        value: proteins.pork || 0,
        fullMark: 100,
      },
      {
        subject: 'Seafood',
        value: proteins.seafood || 0,
        fullMark: 100,
      },
      {
        subject: 'Vegetarian',
        value: proteins.vegetarian || 0,
        fullMark: 100,
      },
      {
        subject: 'Spice',
        value: spiceLevel || 0,
        fullMark: 100,
      },
      {
        subject: 'Toppings',
        value: toppingVariety || 0,
        fullMark: 100,
      }
    ];
  };
  
  const chartData = formatChartData(flavorProfile);
  
  return (
    <div className="flavor-radar metric-card">
      <h2 className="metric-title">Flavor Radar</h2>
      <div className="radar-container">
        <ResponsiveContainer width="100%" height={250}>
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" tick={{ fill: '#666', fontSize: 12 }} />
            <Radar 
              name="Flavor Profile" 
              dataKey="value" 
              stroke="#ff5722" 
              fill="#ff5722" 
              fillOpacity={0.6} 
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default FlavorRadar;