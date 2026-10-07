export interface CampusOutlet {
  id: string;
  name: string;
  location: string;
  capacity: number;
  activeStatus: 'Optimal' | 'Busy' | 'Prep Mode';
}

export interface FoodItem {
  id: string;
  name: string;
  category: 'Main Course' | 'Snacks' | 'Beverages' | 'Combos';
  isVeg: boolean;
  basePrice: number;
  prepTimeMins: number;
  popularOutlets: string[];
}

export interface DataPoint {
  id: string;
  date: string;
  outlet: string;
  students: number;
  weather: 'Sunny' | 'Cloudy' | 'Rainy' | 'Cold' | 'Extreme Heat';
  tempCelsius: number;
  academicDay: 'Normal' | 'Exam' | 'Holiday' | 'Event' | 'Weekend';
  item: string;
  sold: number;
  leftover: number;
  predicted: number;
  wasteSavedKg: number;
  moneySaved: number;
}

export interface PredictionInput {
  outlet: string;
  food: string;
  students: number;
  weather: 'Sunny' | 'Cloudy' | 'Rainy' | 'Cold' | 'Extreme Heat';
  tempCelsius: number;
  academicDay: 'Normal' | 'Exam' | 'Holiday' | 'Event' | 'Weekend';
  previousSales: number;
  dayOfWeek: string;
}

export interface PredictionResult {
  predictedDemand: number;
  recommendedPrep: number;
  buffer: number;
  confidence: number;
  estimatedWasteMin: number;
  estimatedWasteMax: number;
  costSavingsEst: number;
  co2SavedKg: number;
  stockoutRisk: 'Low' | 'Moderate' | 'High';
  factors: {
    name: string;
    impact: string; // e.g. "+15%", "-25%"
    type: 'positive' | 'negative' | 'neutral';
  }[];
}

export interface KitchenTicket {
  ticketId: string;
  timestamp: string;
  outlet: string;
  item: string;
  recommendedPrep: number;
  predictedDemand: number;
  buffer: number;
  expectedStudents: number;
  weather: string;
  academicDay: string;
  status: 'Queued' | 'Preparing' | 'Ready' | 'Dispatched';
}

export interface PresetScenario {
  id: string;
  name: string;
  icon: string;
  description: string;
  outlet: string;
  food: string;
  students: number;
  weather: 'Sunny' | 'Cloudy' | 'Rainy' | 'Cold' | 'Extreme Heat';
  tempCelsius: number;
  academicDay: 'Normal' | 'Exam' | 'Holiday' | 'Event' | 'Weekend';
  previousSales: number;
}
