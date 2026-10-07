import { CampusOutlet, FoodItem, DataPoint, PresetScenario } from '@/types/campus';

export const campusOutlets: CampusOutlet[] = [
  { id: 'all', name: 'All Outlets Combined', location: 'Campus-wide', capacity: 3500, activeStatus: 'Optimal' },
  { id: 'central', name: 'Central Canteen', location: 'Central Academic Block', capacity: 1500, activeStatus: 'Busy' },
  { id: 'yuba', name: 'Yuba Cafe', location: 'Student Activity Center', capacity: 600, activeStatus: 'Optimal' },
  { id: 'motherdairy', name: 'Mother Dairy Kiosk', location: 'Quadrangle Plaza', capacity: 400, activeStatus: 'Optimal' },
  { id: 'alameens', name: 'Al Ameens Food Court', location: 'Hostel & Food Complex', capacity: 950, activeStatus: 'Prep Mode' },
  { id: 'nutrifresh', name: 'NutriFresh Canteen', location: 'Sports & Health Complex', capacity: 450, activeStatus: 'Optimal' },
];

export const foodCatalog: FoodItem[] = [
  // Biryani & Non-Veg Favorites
  { id: 'biryani', name: 'Hyderabadi Chicken Biryani', category: 'Main Course', isVeg: false, basePrice: 150, prepTimeMins: 45, popularOutlets: ['central', 'alameens'] },
  { id: 'chickenroll', name: 'Chicken Kathi Roll', category: 'Snacks', isVeg: false, basePrice: 90, prepTimeMins: 15, popularOutlets: ['yuba', 'alameens'] },
  { id: 'butterchicken', name: 'Butter Chicken with Naan', category: 'Main Course', isVeg: false, basePrice: 160, prepTimeMins: 35, popularOutlets: ['central', 'alameens'] },
  { id: 'chickenburger', name: 'Crispy Chicken Burger', category: 'Snacks', isVeg: false, basePrice: 110, prepTimeMins: 15, popularOutlets: ['yuba', 'alameens'] },
  { id: 'eggroll', name: 'Special Egg Roll', category: 'Snacks', isVeg: false, basePrice: 70, prepTimeMins: 12, popularOutlets: ['yuba', 'central'] },
  { id: 'tandooricombo', name: 'Tandoori Chicken Combo', category: 'Main Course', isVeg: false, basePrice: 175, prepTimeMins: 30, popularOutlets: ['alameens', 'central'] },

  // Beverages & Cold Coffee Drinks
  { id: 'coldcoffee', name: 'Iced Cold Coffee', category: 'Beverages', isVeg: true, basePrice: 65, prepTimeMins: 8, popularOutlets: ['yuba', 'motherdairy', 'nutrifresh'] },
  { id: 'lemonsoda', name: 'Fresh Lemon Soda', category: 'Beverages', isVeg: true, basePrice: 40, prepTimeMins: 5, popularOutlets: ['motherdairy', 'central', 'nutrifresh'] },
  { id: 'mangolassi', name: 'Special Mango Lassi', category: 'Beverages', isVeg: true, basePrice: 50, prepTimeMins: 6, popularOutlets: ['motherdairy', 'central'] },
  { id: 'chocoshake', name: 'Thick Chocolate Shake', category: 'Beverages', isVeg: true, basePrice: 80, prepTimeMins: 10, popularOutlets: ['yuba', 'motherdairy'] },

  // Veg Classics
  { id: 'vegthali', name: 'Deluxe Veg Thali', category: 'Main Course', isVeg: true, basePrice: 110, prepTimeMins: 25, popularOutlets: ['central', 'nutrifresh'] },
  { id: 'paneercombo', name: 'Paneer Butter Masala Combo', category: 'Main Course', isVeg: true, basePrice: 130, prepTimeMins: 25, popularOutlets: ['central', 'nutrifresh'] },
  { id: 'samosa', name: 'Crispy Samosa (Pair)', category: 'Snacks', isVeg: true, basePrice: 35, prepTimeMins: 15, popularOutlets: ['central', 'motherdairy', 'yuba'] },
];

export const initialDataset: DataPoint[] = [
  { id: 'log-1', date: '2024-10-01', outlet: 'Central Canteen', students: 435, weather: 'Sunny', tempCelsius: 28, academicDay: 'Normal', item: 'Hyderabadi Chicken Biryani', sold: 165, leftover: 7, predicted: 162, wasteSavedKg: 14.2, moneySaved: 2100 },
  { id: 'log-2', date: '2024-10-02', outlet: 'Central Canteen', students: 410, weather: 'Cloudy', tempCelsius: 26, academicDay: 'Normal', item: 'Deluxe Veg Thali', sold: 138, leftover: 9, predicted: 135, wasteSavedKg: 11.5, moneySaved: 1430 },
  { id: 'log-3', date: '2024-10-03', outlet: 'Yuba Cafe', students: 460, weather: 'Sunny', tempCelsius: 30, academicDay: 'Event', item: 'Chicken Kathi Roll', sold: 182, leftover: 5, predicted: 178, wasteSavedKg: 18.0, moneySaved: 2450 },
  { id: 'log-4', date: '2024-10-04', outlet: 'Yuba Cafe', students: 380, weather: 'Sunny', tempCelsius: 29, academicDay: 'Normal', item: 'Iced Cold Coffee', sold: 240, leftover: 8, predicted: 235, wasteSavedKg: 5.4, moneySaved: 1680 },
  { id: 'log-5', date: '2024-10-05', outlet: 'Al Ameens Food Court', students: 475, weather: 'Sunny', tempCelsius: 29, academicDay: 'Normal', item: 'Butter Chicken with Naan', sold: 145, leftover: 6, predicted: 142, wasteSavedKg: 19.5, moneySaved: 2900 },
  { id: 'log-6', date: '2024-10-06', outlet: 'Mother Dairy Kiosk', students: 320, weather: 'Sunny', tempCelsius: 31, academicDay: 'Normal', item: 'Special Mango Lassi', sold: 190, leftover: 5, predicted: 185, wasteSavedKg: 4.2, moneySaved: 1250 },
  { id: 'log-7', date: '2024-10-07', outlet: 'Al Ameens Food Court', students: 420, weather: 'Rainy', tempCelsius: 21, academicDay: 'Exam', item: 'Tandoori Chicken Combo', sold: 98, leftover: 14, predicted: 102, wasteSavedKg: 15.2, moneySaved: 2450 },
  { id: 'log-8', date: '2024-10-08', outlet: 'NutriFresh Canteen', students: 450, weather: 'Sunny', tempCelsius: 27, academicDay: 'Normal', item: 'Paneer Butter Masala Combo', sold: 152, leftover: 5, predicted: 150, wasteSavedKg: 16.8, moneySaved: 2280 },
  { id: 'log-9', date: '2024-10-09', outlet: 'Central Canteen', students: 490, weather: 'Sunny', tempCelsius: 28, academicDay: 'Event', item: 'Hyderabadi Chicken Biryani', sold: 210, leftover: 8, predicted: 205, wasteSavedKg: 22.1, moneySaved: 3450 },
  { id: 'log-10', date: '2024-10-10', outlet: 'Yuba Cafe', students: 395, weather: 'Cloudy', tempCelsius: 24, academicDay: 'Normal', item: 'Crispy Chicken Burger', sold: 165, leftover: 6, predicted: 160, wasteSavedKg: 9.8, moneySaved: 1850 },
];

export const foodDemandData = [
  { item: 'Hyderabadi Chicken Biryani', demand: 485, wasteReduction: '94%' },
  { item: 'Iced Cold Coffee', demand: 420, wasteReduction: '96%' },
  { item: 'Chicken Kathi Roll', demand: 380, wasteReduction: '89%' },
  { item: 'Butter Chicken & Naan', demand: 320, wasteReduction: '93%' },
  { item: 'Crispy Chicken Burger', demand: 290, wasteReduction: '90%' },
  { item: 'Special Mango Lassi', demand: 260, wasteReduction: '95%' },
];

export const demandTrend = [
  { date: 'Mon Oct 04', actual: 142, predicted: 145, leftover: 6 },
  { date: 'Tue Oct 05', actual: 138, predicted: 135, leftover: 7 },
  { date: 'Wed Oct 06', actual: 165, predicted: 160, leftover: 5 },
  { date: 'Thu Oct 07', actual: 104, predicted: 108, leftover: 11 },
  { date: 'Fri Oct 08', actual: 178, predicted: 175, leftover: 4 },
  { date: 'Sat Oct 09', actual: 152, predicted: 148, leftover: 6 },
  { date: 'Sun Oct 10', actual: 188, predicted: 185, leftover: 5 },
];

export const stats = {
  avgDailyDemand: 432,
  avgLeftover: '3.8%',
  traditionalWasteAvg: '19.4%',
  modelAccuracy: '94.6%',
  totalMoneySaved: '₹1,68,500',
  totalWastePreventedKg: '1,420 kg',
  co2PreventedKg: '3,550 kg',
};

export const presetScenarios: PresetScenario[] = [
  {
    id: 'rainy-exam',
    name: '🌧 Rainy Exam Day',
    icon: 'CloudRain',
    description: 'Heavy rain causes student movement to drop, while exams shift eating times.',
    outlet: 'Central Canteen',
    food: 'Deluxe Veg Thali',
    students: 310,
    weather: 'Rainy',
    tempCelsius: 20,
    academicDay: 'Exam',
    previousSales: 150,
  },
  {
    id: 'cultural-fest',
    name: '🎉 Campus Cultural Fest',
    icon: 'Sparkles',
    description: 'Huge surge in visitors, alumni, and students throughout the campus.',
    outlet: 'Central Canteen',
    food: 'Hyderabadi Chicken Biryani',
    students: 580,
    weather: 'Sunny',
    tempCelsius: 28,
    academicDay: 'Event',
    previousSales: 160,
  },
  {
    id: 'sunny-monday',
    name: '☀️ Normal Sunny Monday',
    icon: 'Sun',
    description: 'High attendance with steady lunch rush across engineering & business departments.',
    outlet: 'Yuba Cafe',
    food: 'Chicken Kathi Roll',
    students: 440,
    weather: 'Sunny',
    tempCelsius: 27,
    academicDay: 'Normal',
    previousSales: 145,
  },
  {
    id: 'weekend-hostel',
    name: '🍕 Weekend Hostel Craze',
    icon: 'Flame',
    description: 'Students gather at evening dining spots; high demand for cold coffee & snacks.',
    outlet: 'Yuba Cafe',
    food: 'Iced Cold Coffee',
    students: 390,
    weather: 'Cloudy',
    tempCelsius: 24,
    academicDay: 'Weekend',
    previousSales: 220,
  },
];
