# Taco Tracker App - MVP Specification
*Updated with Taco History feature*

## Overview
Taco Tracker is a fun, gamified web application that allows users to log and track tacos eaten while traveling. The MVP focuses on simple engagement metrics and local storage implementation to minimize complexity.

## Core Features

### 1. Taco History
- **Primary Function**: Display and browse all previously logged tacos
- **Navigation**: "Past Tacos" button in upper-right corner next to app headline
- **Sorting Options**:
  - Recent date (default view, newest first)
  - Location (grouped by city/state/country)
  - Taco preferences (grouped by protein type or preparation style)
- **Filtering Options**:
  - Date range selector
  - Location selector
  - Protein/ingredient selector
- **Display Format**:
  - Card-based grid view with optional list view toggle
  - Each card shows key taco info, photo (if available), and location
  - Expandable cards for viewing full details

### 2. Taco Logging
- **Primary Function**: Allow users to log tacos they've eaten with basic information
- **Data Points**:
  - Taco name/type
  - Date consumed
  - Location (city/state/country)
  - Fillings/proteins (checkbox selection)
  - Toppings (checkbox selection)
  - Spice level (1-5 scale)
  - Optional photo upload (stored as base64 string)
  - Optional notes/comments

### 2. Homescreen Dashboard
The homescreen will feature five key engagement metrics:

#### a. Taco Count
- Large, prominent counter showing total tacos logged
- Celebration animations at milestone counts (10, 25, 50, etc.)
- "Last 30 days" counter below the total count

#### b. Variety Score
- Percentage score showing taco variety in the current month
- Calculation: (Unique taco types tried this month / Total tacos this month) × 100
- Visual indicator showing improvement/decline from previous month

#### c. Taco Streak
- Counter showing consecutive days/weeks with taco entries
- Small calendar visualization showing streak days
- Encouraging messages based on streak length

#### d. Weekly Challenge
- One simple, rotating weekly challenge
- Progress indicator for current challenge
- Examples:
  - "Try a taco with a protein you haven't logged before"
  - "Log tacos from 3 different locations this week"
  - "Try a taco with at least 4 different toppings"

#### e. Flavor Radar
- Simple radar/spider chart showing preference distribution
- Categories:
  - Protein types (beef, chicken, pork, seafood, vegetarian)
  - Spice levels (average across all tacos)
  - Topping variety (how many different toppings used)
  - Preparation styles (grilled, fried, etc.)

## Technical Specifications

### Data Structure

```javascript
// Example data structure for local storage
const tacoTrackerData = {
  user: {
    name: "TacoLover",
    startDate: "2025-03-19",
    preferences: {
      // UI preferences, etc.
    }
  },
  
  tacos: [
    {
      id: "taco_1234567",
      name: "Al Pastor Taco",
      date: "2025-03-19",
      location: {
        city: "Austin",
        state: "TX",
        country: "USA"
      },
      protein: ["pork"],
      toppings: ["onion", "cilantro", "pineapple"],
      spiceLevel: 3,
      photo: "base64encodedstring", // Optional
      notes: "Amazing street taco from food truck",
    }
  ],
  
  stats: {
    streakDays: 3,
    currentWeeklyChallenge: {
      type: "NEW_PROTEIN",
      description: "Try a taco with a protein you haven't had before",
      progress: 0,
      target: 1,
      startDate: "2025-03-17",
      endDate: "2025-03-23"
    },
    lastCalculated: "2025-03-19"
  },
  
  achievements: [
    {
      id: "FIRST_TACO",
      name: "First Bite",
      description: "Log your first taco",
      dateEarned: "2025-03-17"
    }
  ]
};
```

### React Component Structure

```
App
├── Header
│   ├── Logo
│   ├── Title
│   └── NavButtons (including "Past Tacos" button)
├── Dashboard
│   ├── TacoCounter
│   ├── VarietyScore
│   ├── StreakDisplay
│   ├── WeeklyChallenge
│   └── FlavorRadar
├── TacoLogger
│   ├── TacoForm
│   └── SuccessMessage
├── TacoHistory
│   ├── SortControls
│   │   └── SortOptionButtons (Date/Location/Preferences)
│   ├── FilterControls
│   │   ├── DateRangeFilter
│   │   ├── LocationFilter
│   │   └── IngredientFilter
│   ├── ViewToggle (Grid/List view)
│   └── TacoList
│       └── TacoCard
│           └── ExpandedTacoDetails
└── Footer
```

### Local Storage Implementation

- Use browser's localStorage API for data persistence
- Key functions:
  ```javascript
  // Save data to localStorage
  const saveData = (data) => {
    try {
      localStorage.setItem('tacoTrackerData', JSON.stringify(data));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
      // Implement fallback or error messaging
    }
  };

  // Load data from localStorage
  const loadData = () => {
    try {
      const data = localStorage.getItem('tacoTrackerData');
      return data ? JSON.parse(data) : initialDataStructure;
    } catch (error) {
      console.error('Error loading from localStorage:', error);
      return initialDataStructure;
    }
  };
  ```

- Implement data backup/export functionality to prevent data loss
- Include data validation before saving to prevent corruption

### Metric Calculations

#### Taco Count
```javascript
const getTacoCount = (tacos) => {
  return tacos.length;
};

const getRecentTacoCount = (tacos) => {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  
  return tacos.filter(taco => new Date(taco.date) >= thirtyDaysAgo).length;
};
```

#### Variety Score
```javascript
const getVarietyScore = (tacos) => {
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
```

#### Taco Streak
```javascript
const calculateStreak = (tacos) => {
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
```

### Weekly Challenge Implementation

- Define a set of possible challenges in an array
- Each challenge has criteria for auto-completion checking
- Select new challenge every Sunday at midnight
- Examples:

```javascript
const possibleChallenges = [
  {
    type: "NEW_PROTEIN",
    description: "Try a taco with a protein you haven't had before",
    checkCompletion: (newTaco, existingTacos) => {
      const existingProteins = new Set();
      existingTacos.forEach(taco => {
        taco.protein.forEach(p => existingProteins.add(p));
      });
      
      return newTaco.protein.some(p => !existingProteins.has(p));
    }
  },
  {
    type: "SPICY_WEEK",
    description: "Try 3 tacos with spice level 4 or higher",
    target: 3,
    checkCompletion: (newTaco, _, stats) => {
      return newTaco.spiceLevel >= 4 ? 1 : 0;
    }
  },
  // More challenges...
];

const selectWeeklyChallenge = () => {
  const randomIndex = Math.floor(Math.random() * possibleChallenges.length);
  const challenge = {...possibleChallenges[randomIndex]};
  
  const now = new Date();
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay()); // Sunday
  startOfWeek.setHours(0, 0, 0, 0);
  
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6); // Saturday
  endOfWeek.setHours(23, 59, 59, 999);
  
  return {
    ...challenge,
    progress: 0,
    target: challenge.target || 1,
    startDate: startOfWeek.toISOString(),
    endDate: endOfWeek.toISOString()
  };
};
```

### Flavor Radar Implementation

- Use a simple chart library like Chart.js or Recharts
- Calculate preferences based on logged tacos

```javascript
const calculateFlavorProfile = (tacos) => {
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
```

## UI/UX Considerations

### Dashboard Design
- Colorful, playful design with taco-themed elements
- Responsive layout that works on mobile and desktop
- Simple animations for milestone achievements
- Consistent color-coding for metrics

### Empty States
- Friendly onboarding for first-time users
- Encouraging messages when no tacos have been logged
- Sample data option for demonstration

### Data Entry Simplification
- Common taco presets for quick logging
- Save favorite combinations
- Copy previous entry as template

### Accessibility
- High contrast between text and background
- Adequate text size for readability
- Alternative text for images and icons
- Keyboard navigation support

## Future Enhancements (Post-MVP)
- Cloud sync capability
- Social sharing
- Map visualization of taco locations
- Photo gallery of eaten tacos
- Advanced achievements system
- Restaurant recommendations
- Taco recipe collection
