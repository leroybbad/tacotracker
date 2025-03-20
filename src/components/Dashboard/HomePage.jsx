import { useState } from 'react';
import Dashboard from './Dashboard';
import TacoLogger from '../TacoLogger/TacoLogger';
import './HomePage.css';

const HomePage = () => {
  const [isLoggingTaco, setIsLoggingTaco] = useState(false);
  
  const handleLogTaco = () => {
    setIsLoggingTaco(true);
  };
  
  const handleCloseLogger = () => {
    setIsLoggingTaco(false);
  };
  
  return (
    <div className="home-page">
      <Dashboard />
      
      <button className="log-taco-button" onClick={handleLogTaco}>
        Eat Taco
      </button>
      
      {isLoggingTaco && (
        <TacoLogger onClose={handleCloseLogger} />
      )}
    </div>
  );
};

export default HomePage;