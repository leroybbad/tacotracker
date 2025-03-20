import { useState, useEffect } from 'react';
import { useTacoData } from '../../hooks/useTacoData';
import TacoForm from './TacoForm';
import Confetti from 'react-confetti';
import './TacoLogger.css';

const TacoLogger = ({ onClose }) => {
  const { addTaco } = useTacoData();
  const [isOpen, setIsOpen] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  useEffect(() => {
    // Slide up animation
    setTimeout(() => {
      setIsOpen(true);
    }, 50);
  }, []);
  
  const handleSubmit = (tacoData) => {
    // Add the taco to the database
    addTaco(tacoData);
    
    // Show confetti
    setShowConfetti(true);
    setFormSubmitted(true);
    
    // Close after a delay
    setTimeout(() => {
      handleClose();
    }, 3000);
  };
  
  const handleClose = () => {
    // Slide down animation
    setIsOpen(false);
    
    // Close modal after animation
    setTimeout(() => {
      onClose();
    }, 300);
  };
  
  return (
    <>
      <div className="taco-logger-overlay" onClick={handleClose} />
      
      <div className={`taco-logger ${isOpen ? 'open' : ''}`}>
        <div className="taco-logger-header">
          <h2>Log a Taco</h2>
          <button className="close-button" onClick={handleClose}>×</button>
        </div>
        
        <div className="taco-logger-content">
          {formSubmitted ? (
            <div className="success-message">
              <h3>Taco added! 🌮</h3>
              <p>Your taco has been logged successfully.</p>
            </div>
          ) : (
            <TacoForm onSubmit={handleSubmit} />
          )}
        </div>
      </div>
      
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={500}
          gravity={0.3}
          colors={['#FFDC00', '#FF851B', '#FF4136', '#3D9970', '#01FF70']}
        />
      )}
    </>
  );
};

export default TacoLogger;