import { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { loadData, saveData } from '../utils/localStorage';
import { calculateStreak, calculateFlavorProfile, getVarietyScore } from '../utils/metrics';
import { selectWeeklyChallenge, checkChallengeCompletion } from '../utils/challenges';

// Create a context for the taco data
const TacoContext = createContext();

// Custom hook to use the taco context
export const useTacoData = () => {
  const context = useContext(TacoContext);
  if (!context) {
    throw new Error('useTacoData must be used within a TacoProvider');
  }
  return context;
};

// Provider component for the taco data
export const TacoProvider = ({ children }) => {
  const [appData, setAppData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Load data from localStorage on initial render
  useEffect(() => {
    const data = loadData();
    setAppData(data);
    setLoading(false);
  }, []);
  
  // Update streak and weekly challenge when needed
  useEffect(() => {
    if (!appData) return;
    
    // Check if we need to update stats
    const today = new Date().toISOString().split('T')[0];
    if (appData.stats.lastCalculated !== today) {
      // Calculate new streak
      const newStreak = calculateStreak(appData.tacos);
      
      // Check if we need a new weekly challenge
      let currentChallenge = appData.stats.currentWeeklyChallenge;
      const challengeEndDate = new Date(currentChallenge.endDate);
      const now = new Date();
      
      if (now > challengeEndDate) {
        currentChallenge = selectWeeklyChallenge();
      }
      
      // Update stats
      setAppData(prev => ({
        ...prev,
        stats: {
          ...prev.stats,
          streakDays: newStreak,
          currentWeeklyChallenge: currentChallenge,
          lastCalculated: today
        }
      }));
    }
  }, [appData]);
  
  // Save data to localStorage whenever it changes
  useEffect(() => {
    if (appData) {
      saveData(appData);
    }
  }, [appData]);
  
  // Add a new taco to the database
  const addTaco = (tacoData) => {
    const newTaco = {
      id: uuidv4(),
      date: new Date().toISOString().split('T')[0],
      ...tacoData
    };
    
    // Update challenge progress
    const progressIncrement = checkChallengeCompletion(
      appData.stats.currentWeeklyChallenge,
      newTaco,
      appData.tacos
    );
    
    const updatedChallenge = {
      ...appData.stats.currentWeeklyChallenge,
      progress: appData.stats.currentWeeklyChallenge.progress + progressIncrement
    };
    
    // Add taco and update stats
    setAppData(prev => ({
      ...prev,
      tacos: [newTaco, ...prev.tacos],
      stats: {
        ...prev.stats,
        streakDays: calculateStreak([newTaco, ...prev.tacos]),
        currentWeeklyChallenge: updatedChallenge
      }
    }));
    
    return newTaco;
  };
  
  // Delete a taco from the database
  const deleteTaco = (tacoId) => {
    setAppData(prev => ({
      ...prev,
      tacos: prev.tacos.filter(taco => taco.id !== tacoId)
    }));
  };
  
  // Get flavor profile data
  const getFlavorProfile = () => {
    if (!appData || !appData.tacos.length) {
      return {
        proteins: { beef: 0, chicken: 0, pork: 0, seafood: 0, vegetarian: 0 },
        spiceLevel: 0,
        toppingVariety: 0,
        preparationStyles: { grilled: 0, fried: 0, baked: 0, steamed: 0 }
      };
    }
    
    return calculateFlavorProfile(appData.tacos);
  };
  
  // Get variety score
  const getVarietyScoreData = () => {
    if (!appData || !appData.tacos.length) {
      return 0;
    }
    
    return getVarietyScore(appData.tacos);
  };
  
  // Get taco streak data
  const getStreakData = () => {
    if (!appData) {
      return 0;
    }
    
    return appData.stats.streakDays;
  };
  
  // Get weekly challenge data
  const getWeeklyChallengeData = () => {
    if (!appData) {
      return null;
    }
    
    return appData.stats.currentWeeklyChallenge;
  };
  
  // Create the context value
  const value = {
    loading,
    tacos: appData?.tacos || [],
    addTaco,
    deleteTaco,
    getFlavorProfile,
    getVarietyScoreData,
    getStreakData,
    getWeeklyChallengeData
  };
  
  return (
    <TacoContext.Provider value={value}>
      {children}
    </TacoContext.Provider>
  );
};