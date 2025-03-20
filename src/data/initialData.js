// Initial data structure for the app
export const initialData = {
  user: {
    name: "TacoLover",
    startDate: new Date().toISOString().split('T')[0],
    preferences: {}
  },
  
  tacos: [],
  
  stats: {
    streakDays: 0,
    currentWeeklyChallenge: {
      type: "NEW_PROTEIN",
      description: "Try a taco with a protein you haven't had before",
      progress: 0,
      target: 1,
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(new Date().setDate(new Date().getDate() + 7)).toISOString().split('T')[0]
    },
    lastCalculated: new Date().toISOString().split('T')[0]
  },
  
  achievements: []
};

// Define possible taco proteins
export const PROTEINS = [
  "beef", "chicken", "pork", "shrimp", "fish", "vegetarian", "bean", "chorizo"
];

// Define possible taco toppings
export const TOPPINGS = [
  "cheese", "sour cream", "guacamole", "lettuce", "tomato", "onion", "cilantro", 
  "salsa", "jalapeños", "pico de gallo", "lime", "radishes", "pineapple"
];

// Define possible preparation types
export const PREPARATIONS = [
  "grilled", "fried", "steamed", "baked", "raw"
];