import { PredictionInput, PredictionResult } from '@/types/campus';

const foodWeights: Record<string, number> = {
  'Hyderabadi Chicken Biryani': 1.35,
  'Chicken Kathi Roll': 1.15,
  'Butter Chicken with Naan': 1.28,
  'Crispy Chicken Burger': 1.10,
  'Special Egg Roll': 0.95,
  'Tandoori Chicken Combo': 1.30,
  'Iced Cold Coffee': 1.40,
  'Fresh Lemon Soda': 0.85,
  'Special Mango Lassi': 0.90,
  'Thick Chocolate Shake': 1.15,
  'Deluxe Veg Thali': 1.05,
  'Paneer Butter Masala Combo': 1.20,
  'Crispy Samosa (Pair)': 0.60,
};

const weatherWeights: Record<string, number> = {
  Sunny: 1.05,
  Cloudy: 0.98,
  Rainy: 0.76,
  Cold: 1.10,
  'Extreme Heat': 0.82,
};

const academicWeights: Record<string, number> = {
  Normal: 1.0,
  Exam: 0.68,
  Holiday: 0.22,
  Event: 1.38,
  Weekend: 0.85,
};

const outletMultipliers: Record<string, number> = {
  'Central Canteen': 1.25,
  'Yuba Cafe': 1.05,
  'Mother Dairy Kiosk': 0.85,
  'Al Ameens Food Court': 1.15,
  'NutriFresh Canteen': 0.75,
  'All Outlets Combined': 1.0,
};

export function predictDemand(input: PredictionInput): PredictionResult {
  const base = input.previousSales > 0 ? input.previousSales : Math.round(input.students * 0.42);

  const foodW = foodWeights[input.food] ?? 1.0;
  const weatherW = weatherWeights[input.weather] ?? 1.0;
  const academicW = academicWeights[input.academicDay] ?? 1.0;
  const outletM = outletMultipliers[input.outlet] ?? 1.0;

  // Attendance ratio compared to benchmark campus average (400 students)
  const attendanceFactor = input.students > 0 ? input.students / 400 : 1.0;

  // Temperature impact
  let tempFactor = 1.0;
  if (input.tempCelsius < 15) tempFactor = 1.08; // Cold weather boosts hot food demand
  else if (input.tempCelsius > 32 && (input.food.includes('Coffee') || input.food.includes('Soda') || input.food.includes('Lassi') || input.food.includes('Shake'))) {
    tempFactor = 1.35; // Hot weather boosts cold beverages significantly!
  } else if (input.tempCelsius > 35) tempFactor = 0.88; // Hot weather drops heavy meal demand

  const rawDemand = base * foodW * weatherW * academicW * outletM * attendanceFactor * tempFactor;
  const predictedDemand = Math.max(12, Math.round(rawDemand));

  // Dynamic safety buffer: 3.5% to 5% based on variance factors
  const bufferPct = input.weather === 'Rainy' ? 0.03 : 0.045;
  const buffer = Math.max(2, Math.round(predictedDemand * bufferPct));
  const recommendedPrep = predictedDemand + buffer;

  // Confidence calculation based on features stability
  const baseConfidence = 91;
  const attendanceVariance = Math.abs(attendanceFactor - 1.0) * 10;
  const confidence = Math.min(97, Math.max(76, Math.round(baseConfidence + (input.previousSales > 0 ? 3 : 0) - attendanceVariance)));

  // Waste estimation
  const estimatedWasteMin = Math.max(0, Math.round(buffer * 0.4));
  const estimatedWasteMax = Math.max(estimatedWasteMin + 2, Math.round(buffer * 1.2));

  // Traditional un-optimized overcook baseline would have prepared 25% extra!
  const unoptimizedPrep = Math.round(predictedDemand * 1.22);
  const platesSavedFromWaste = Math.max(0, unoptimizedPrep - recommendedPrep);

  // Financial savings (avg ₹110 per item cost) & environmental impact
  const costSavingsEst = platesSavedFromWaste * 105;
  const co2SavedKg = parseFloat((platesSavedFromWaste * 0.85).toFixed(1));

  // Stockout risk
  let stockoutRisk: 'Low' | 'Moderate' | 'High' = 'Low';
  if (input.academicDay === 'Event' && input.weather === 'Sunny') stockoutRisk = 'Moderate';
  if (input.students > 520 && buffer < 8) stockoutRisk = 'High';

  // Feature impact breakdown
  const factors: PredictionResult['factors'] = [];

  if (academicW !== 1.0) {
    const pct = Math.round((academicW - 1.0) * 100);
    factors.push({
      name: `Academic (${input.academicDay})`,
      impact: `${pct > 0 ? '+' : ''}${pct}%`,
      type: pct >= 0 ? 'positive' : 'negative',
    });
  }

  if (weatherW !== 1.0) {
    const pct = Math.round((weatherW - 1.0) * 100);
    factors.push({
      name: `Weather (${input.weather})`,
      impact: `${pct > 0 ? '+' : ''}${pct}%`,
      type: pct >= 0 ? 'positive' : 'negative',
    });
  }

  if (attendanceFactor !== 1.0) {
    const pct = Math.round((attendanceFactor - 1.0) * 100);
    factors.push({
      name: `Footfall (${input.students} students)`,
      impact: `${pct > 0 ? '+' : ''}${pct}%`,
      type: pct >= 0 ? 'positive' : 'negative',
    });
  }

  if (tempFactor !== 1.0) {
    const pct = Math.round((tempFactor - 1.0) * 100);
    factors.push({
      name: `Temperature (${input.tempCelsius}°C)`,
      impact: `${pct > 0 ? '+' : ''}${pct}%`,
      type: pct >= 0 ? 'positive' : 'negative',
    });
  }

  if (factors.length === 0) {
    factors.push({ name: 'Baseline Demand', impact: 'Standard', type: 'neutral' });
  }

  return {
    predictedDemand,
    recommendedPrep,
    buffer,
    confidence,
    estimatedWasteMin,
    estimatedWasteMax,
    costSavingsEst,
    co2SavedKg,
    stockoutRisk,
    factors,
  };
}
