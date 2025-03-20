import { weeklyChallenge } from '../data/weeklyChallenge';

// Select a weekly challenge
export const selectWeeklyChallenge = () => {
  const randomIndex = Math.floor(Math.random() * weeklyChallenge.length);
  const challenge = {...weeklyChallenge[randomIndex]};
  
  const now = new Date();
  const startOfWeek = new Date(now);
  const day = startOfWeek.getDay(); // 0 is Sunday
  startOfWeek.setDate(startOfWeek.getDate() - day); // Go to current week's Sunday
  startOfWeek.setHours(0, 0, 0, 0);
  
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6); // Go to Saturday
  endOfWeek.setHours(23, 59, 59, 999);
  
  return {
    ...challenge,
    progress: 0,
    target: challenge.target || 1,
    startDate: startOfWeek.toISOString(),
    endDate: endOfWeek.toISOString()
  };
};

// Check if a challenge is completed
export const checkChallengeCompletion = (challenge, newTaco, existingTacos) => {
  let progressIncrement = 0;
  
  switch (challenge.type) {
    case 'NEW_PROTEIN':
      // Check if the taco has a protein that hasn't been used before
      const existingProteins = new Set();
      existingTacos.forEach(taco => {
        taco.protein.forEach(p => existingProteins.add(p));
      });
      
      progressIncrement = newTaco.protein.some(p => !existingProteins.has(p)) ? 1 : 0;
      break;
      
    case 'SPICY_WEEK':
      // Check if the taco has a spice level of 4 or higher
      progressIncrement = newTaco.spiceLevel >= 4 ? 1 : 0;
      break;
      
    case 'LOCATION_VARIETY':
      // Check if the taco is from a new location this week
      const weekStart = new Date(challenge.startDate);
      const weekEnd = new Date(challenge.endDate);
      
      // Get tacos from this week
      const weekTacos = existingTacos.filter(taco => {
        const tacoDate = new Date(taco.date);
        return tacoDate >= weekStart && tacoDate <= weekEnd;
      });
      
      // Check if this location was already logged this week
      const existingLocations = new Set(
        weekTacos.map(taco => `${taco.location.city}_${taco.location.state}_${taco.location.country}`)
      );
      
      const newLocation = `${newTaco.location.city}_${newTaco.location.state}_${newTaco.location.country}`;
      progressIncrement = !existingLocations.has(newLocation) ? 1 : 0;
      break;
      
    case 'TOPPING_EXPLORER':
      // Check if the taco has at least 4 different toppings
      progressIncrement = newTaco.toppings.length >= 4 ? 1 : 0;
      break;
      
    case 'TACO_MARATHON':
      // This will need to be checked differently, as it depends on daily logging
      // For simplicity, we'll just increment by 1 for each taco
      progressIncrement = 1;
      break;
      
    case 'SEAFOOD_WEEK':
      // Check if the taco has seafood protein
      const seafoodProteins = ['shrimp', 'fish'];
      progressIncrement = newTaco.protein.some(p => seafoodProteins.includes(p)) ? 1 : 0;
      break;
      
    case 'VEGETARIAN_VENTURE':
      // Check if the taco is vegetarian
      const vegProteins = ['vegetarian', 'bean'];
      progressIncrement = newTaco.protein.some(p => vegProteins.includes(p)) ? 1 : 0;
      break;
      
    case 'BREAKFAST_TACOS':
      // This will need to be manually marked, but for now we'll assume
      // the user indicates breakfast tacos in the name or notes
      const isBreakfast = 
        newTaco.name.toLowerCase().includes('breakfast') || 
        (newTaco.notes && newTaco.notes.toLowerCase().includes('breakfast'));
      progressIncrement = isBreakfast ? 1 : 0;
      break;
      
    case 'FUSION_EXPLORER':
      // This will need to be manually marked, for now we'll check notes
      const isFusion = 
        newTaco.name.toLowerCase().includes('fusion') || 
        (newTaco.notes && newTaco.notes.toLowerCase().includes('fusion'));
      progressIncrement = isFusion ? 1 : 0;
      break;
      
    case 'HOMEMADE_HERO':
      // This will need to be manually marked, for now we'll check notes
      const isHomemade = 
        newTaco.name.toLowerCase().includes('homemade') || 
        (newTaco.notes && newTaco.notes.toLowerCase().includes('homemade'));
      progressIncrement = isHomemade ? 1 : 0;
      break;
      
    case 'TOPPINGS_GALORE':
      // Add all toppings from this taco to the progress
      progressIncrement = newTaco.toppings.length;
      break;
      
    case 'TACO_VARIETY':
      // Check if this is a new taco type this week
      const weekTacoTypes = new Set();
      
      // Get tacos from this week
      const thisWeekTacos = existingTacos.filter(taco => {
        const tacoDate = new Date(taco.date);
        const challengeStart = new Date(challenge.startDate);
        const challengeEnd = new Date(challenge.endDate);
        return tacoDate >= challengeStart && tacoDate <= challengeEnd;
      });
      
      // Create a "taco type" signature
      thisWeekTacos.forEach(taco => {
        const tacoType = `${taco.name}_${taco.protein.sort().join('_')}`;
        weekTacoTypes.add(tacoType);
      });
      
      const newTacoType = `${newTaco.name}_${newTaco.protein.sort().join('_')}`;
      progressIncrement = !weekTacoTypes.has(newTacoType) ? 1 : 0;
      break;
      
    default:
      progressIncrement = 0;
  }
  
  return progressIncrement;
};