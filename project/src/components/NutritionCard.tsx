import React from 'react';
import { DailyNutrition, User } from '../types';

interface NutritionCardProps {
  nutrition: DailyNutrition;
  goals: User;
}

const NutritionCard: React.FC<NutritionCardProps> = ({ nutrition, goals }) => {
  const calculatePercentage = (current: number, goal: number) => {
    return Math.min(Math.round((current / goal) * 100), 100);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
      <div className="p-5">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Today's Nutrition</h3>
        
        <div className="space-y-4">
          {/* Calories */}
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium text-gray-700">Calories</span>
              <span className="text-sm font-medium text-gray-700">
                {nutrition.calories} / {goals.calorieGoal} kcal
              </span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-500 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${calculatePercentage(nutrition.calories, goals.calorieGoal)}%` }}
              ></div>
            </div>
          </div>
          
          {/* Protein */}
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium text-gray-700">Protein</span>
              <span className="text-sm font-medium text-gray-700">
                {nutrition.protein} / {goals.proteinGoal} g
              </span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-green-500 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${calculatePercentage(nutrition.protein, goals.proteinGoal)}%` }}
              ></div>
            </div>
          </div>
          
          {/* Carbs */}
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium text-gray-700">Carbs</span>
              <span className="text-sm font-medium text-gray-700">
                {nutrition.carbs} / {goals.carbsGoal} g
              </span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-yellow-500 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${calculatePercentage(nutrition.carbs, goals.carbsGoal)}%` }}
              ></div>
            </div>
          </div>
          
          {/* Fat */}
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium text-gray-700">Fat</span>
              <span className="text-sm font-medium text-gray-700">
                {nutrition.fat} / {goals.fatGoal} g
              </span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-red-400 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${calculatePercentage(nutrition.fat, goals.fatGoal)}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NutritionCard;