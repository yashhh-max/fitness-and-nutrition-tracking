import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import MealCard from '../components/MealCard';
import DateSelector from '../components/DateSelector';
import NutritionCard from '../components/NutritionCard';
import { CalendarDays, Filter } from 'lucide-react';

const MealDiary: React.FC = () => {
  const { meals, deleteMeal, dailyNutrition, user, selectedDate, setSelectedDate } = useApp();
  const [showFilters, setShowFilters] = useState(false);
  
  // Get meals for the selected date
  const startOfDay = new Date(selectedDate);
  startOfDay.setHours(0, 0, 0, 0);
  
  const endOfDay = new Date(selectedDate);
  endOfDay.setHours(23, 59, 59, 999);
  
  const filteredMeals = meals
    .filter(meal => meal.timestamp >= startOfDay.getTime() && meal.timestamp <= endOfDay.getTime())
    .sort((a, b) => b.timestamp - a.timestamp);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Meal Diary</h1>
        <div className="flex space-x-2">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="p-2 text-gray-500 hover:text-gray-900 rounded-md hover:bg-gray-100 transition-colors"
          >
            <Filter size={20} />
          </button>
          <DateSelector selectedDate={selectedDate} onChange={setSelectedDate} />
        </div>
      </div>
      
      {showFilters && (
        <div className="bg-white rounded-lg shadow-sm p-4 animate-fade-in">
          <h2 className="text-sm font-medium text-gray-700 mb-3">Filter Options</h2>
          <div className="flex flex-wrap gap-2">
            <button className="px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-medium hover:bg-blue-100 transition-colors">
              Breakfast
            </button>
            <button className="px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-medium hover:bg-blue-100 transition-colors">
              Lunch
            </button>
            <button className="px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-medium hover:bg-blue-100 transition-colors">
              Dinner
            </button>
            <button className="px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-medium hover:bg-blue-100 transition-colors">
              Snacks
            </button>
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Your Meals</h2>
          
          {filteredMeals.length > 0 ? (
            <div className="space-y-4">
              {filteredMeals.map(meal => (
                <MealCard 
                  key={meal.id} 
                  meal={meal} 
                  onDelete={deleteMeal}
                  showDetails 
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <CalendarDays size={48} className="mx-auto text-gray-400 mb-3" />
              <h3 className="text-lg font-medium text-gray-800 mb-1">No meals for this day</h3>
              <p className="text-gray-500">Try scanning a meal or selecting a different date</p>
            </div>
          )}
        </div>
        
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Nutrition Summary</h2>
          <NutritionCard nutrition={dailyNutrition} goals={user} />
          
          <div className="bg-white rounded-xl shadow-sm p-5">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Daily Stats</h3>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Total Meals</span>
                <span className="font-medium text-gray-800">{filteredMeals.length}</span>
              </div>
              
              <div className="h-px bg-gray-100"></div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Calories Left</span>
                <span className="font-medium text-gray-800">
                  {Math.max(0, user.calorieGoal - dailyNutrition.calories)} kcal
                </span>
              </div>
              
              <div className="h-px bg-gray-100"></div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Protein Goal</span>
                <span className={`font-medium ${
                  dailyNutrition.protein >= user.proteinGoal ? 'text-green-600' : 'text-gray-800'
                }`}>
                  {Math.round((dailyNutrition.protein / user.proteinGoal) * 100)}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealDiary;