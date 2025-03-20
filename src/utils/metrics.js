// Get total taco count
export const getTacoCount = (tacos) => {
  return tacos.length;
};

// Get taco count for the last 30 days
export const getRecentTacoCount = (tacos) => {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  
  return tacos.filter(taco => new Date(taco.date) >= thirtyDaysAgo).length;
};

// Calculate the variety score for the current month
export const getVarietyScore = (tacos) => {
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  
  // Filter tacos from current month
  const monthTacos = tacos.filter(taco => {
    const tacoDate = new Date(taco.date);
    return tacoDate.getMonth() === currentMonth && 
           tacoDate.getFullYear() === currentYear;
  });
  
  if (monthTacos.length === 0) return 0;
  
  // Count unique combinations (consider a function of protein + preparation)
  const uniqueCombinations = new Set();
  monthTacos.forEach(taco => {
    const key = `${taco.protein.sort().join('_')}_${taco.preparation || 'standard'}`;
    uniqueCombinations.add(key);
  });
  
  return Math.round((uniqueCombinations.size / monthTacos.length) * 100);
};

// Calculate the current taco streak
export const calculateStreak = (tacos) => {
  if (!tacos.length) return 0;
  
  // Sort tacos by date, most recent first
  const sortedTacos = [...tacos].sort((a, b) => 
    new Date(b.date) - new Date(a.date)
  );
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  // Check if there's a taco from today
  const mostRecentTacoDate = new Date(sortedTacos[0].date);
  mostRecentTacoDate.setHours(0, 0, 0, 0);
  
  // If most recent taco is not from today or yesterday, streak is broken
  const diffDays = Math.floor((today - mostRecentTacoDate) / (1000 * 60 * 60 * 24));
  if (diffDays > 1) return 0;
  
  // Count streak days
  let streak = 1;
  let currentDate = mostRecentTacoDate;
  
  for (let i = 1; i < sortedTacos.length; i++) {
    const prevDate = new Date(sortedTacos[i].date);
    prevDate.setHours(0, 0, 0, 0);
    
    // Check if this taco was from the previous day
    const expectedPrevDate = new Date(currentDate);
    expectedPrevDate.setDate(expectedPrevDate.getDate() - 1);
    
    if (prevDate.getTime() === expectedPrevDate.getTime()) {
      streak++;
      currentDate = prevDate;
    } else {
      break;
    }
  }
  
  return streak;
};

// Calculate the flavor profile based on taco history
export const calculateFlavorProfile = (tacos) => {
  if (!tacos.length) {
    return {
      proteins: { beef: 0, chicken: 0, pork: 0, seafood: 0, vegetarian: 0 },
      spiceLevel: 0,
      toppingVariety: 0,
      preparationStyles: { grilled: 0, fried: 0, baked: 0, steamed: 0 }
    };
  }
  
  // Calculate protein preferences (percentage of each type)
  const proteinCounts = { beef: 0, chicken: 0, pork: 0, seafood: 0, vegetarian: 0 };
  tacos.forEach(taco => {
    taco.protein.forEach(p => {
      if (proteinCounts[p] !== undefined) {
        proteinCounts[p]++;
      }
    });
  });
  
  // Normalize to 0-100 scale
  const totalProteins = Object.values(proteinCounts).reduce((sum, count) => sum + count, 0);
  const proteins = {};
  Object.keys(proteinCounts).forEach(key => {
    proteins[key] = totalProteins ? Math.round((proteinCounts[key] / totalProteins) * 100) : 0;
  });
  
  // Calculate average spice level (0-100 scale)
  const spiceLevel = Math.round((tacos.reduce((sum, taco) => sum + taco.spiceLevel, 0) / tacos.length) * 20);
  
  // Calculate topping variety (0-100 scale, based on average number of toppings)
  const avgToppings = tacos.reduce((sum, taco) => sum + taco.toppings.length, 0) / tacos.length;
  const toppingVariety = Math.min(Math.round((avgToppings / 5) * 100), 100); // Assuming 5+ toppings is "max variety"
  
  // Calculate preparation style preferences
  const prepCounts = { grilled: 0, fried: 0, baked: 0, steamed: 0 };
  tacos.forEach(taco => {
    if (taco.preparation && prepCounts[taco.preparation] !== undefined) {
      prepCounts[taco.preparation]++;
    }
  });
  
  // Normalize to 0-100 scale
  const totalPreps = Object.values(prepCounts).reduce((sum, count) => sum + count, 0);
  const preparationStyles = {};
  Object.keys(prepCounts).forEach(key => {
    preparationStyles[key] = totalPreps ? Math.round((prepCounts[key] / totalPreps) * 100) : 0;
  });
  
  return {
    proteins,
    spiceLevel,
    toppingVariety,
    preparationStyles
  };
};