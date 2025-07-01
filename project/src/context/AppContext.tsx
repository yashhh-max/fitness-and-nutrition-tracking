import React, { createContext, useContext, useState, useEffect } from 'react';
import { Meal, User, DailyNutrition } from '../types';
import { mockMeals } from '../data/mockData';

interface AppContextType {
  meals: Meal[];
  addMeal: (meal: Meal) => void;
  deleteMeal: (id: string) => void;
  user: User;
  dailyNutrition: DailyNutrition;
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  detectFood: (imageUrl: string) => Promise<FoodDetectionResult>;
}

interface FoodDetectionResult {
  foodItems: string[];
  nutritionInfo: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
}

const defaultUser: User = {
  name: 'Alex',
  calorieGoal: 2000,
  proteinGoal: 150,
  carbsGoal: 200,
  fatGoal: 65,
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [meals, setMeals] = useState<Meal[]>(mockMeals);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [user] = useState<User>(defaultUser);
  const [dailyNutrition, setDailyNutrition] = useState<DailyNutrition>({
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
  });

  // Mock AI food detection
  const detectFood = async (imageUrl: string): Promise<FoodDetectionResult> => {
    // In a real app, this would call an AI API
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          foodItems: ['Grilled Chicken Breast', 'Brown Rice', 'Broccoli'],
          nutritionInfo: {
            calories: 420,
            protein: 35,
            carbs: 45,
            fat: 10,
          },
        });
      }, 1500);
    });
  };

  const addMeal = (meal: Meal) => {
    setMeals((prevMeals) => [meal, ...prevMeals]);
  };

  const deleteMeal = (id: string) => {
    setMeals((prevMeals) => prevMeals.filter((meal) => meal.id !== id));
  };

  // Calculate daily nutrition based on meals for the selected date
  useEffect(() => {
    const startOfDay = new Date(selectedDate);
    startOfDay.setHours(0, 0, 0, 0);
    
    const endOfDay = new Date(selectedDate);
    endOfDay.setHours(23, 59, 59, 999);

    const todayMeals = meals.filter(
      (meal) => meal.timestamp >= startOfDay.getTime() && meal.timestamp <= endOfDay.getTime()
    );

    const nutrition = todayMeals.reduce(
      (acc, meal) => {
        acc.calories += meal.calories;
        acc.protein += meal.protein;
        acc.carbs += meal.carbs;
        acc.fat += meal.fat;
        return acc;
      },
      { calories: 0, protein: 0, carbs: 0, fat: 0 }
    );

    setDailyNutrition(nutrition);
  }, [meals, selectedDate]);

  return (
    <AppContext.Provider
      value={{
        meals,
        addMeal,
        deleteMeal,
        user,
        dailyNutrition,
        selectedDate,
        setSelectedDate,
        detectFood,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};