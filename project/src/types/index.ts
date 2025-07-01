export interface Meal {
  id: string;
  name: string;
  imageUrl: string;
  timestamp: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  items?: FoodItem[];
}

export interface FoodItem {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  portion: string;
}

export interface User {
  name: string;
  calorieGoal: number;
  proteinGoal: number;
  carbsGoal: number;
  fatGoal: number;
}

export interface DailyNutrition {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}