import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import NutritionCard from '../components/NutritionCard';
import MealCard from '../components/MealCard';
import DateSelector from '../components/DateSelector';
import { Camera, TrendingUp } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user, dailyNutrition, meals, deleteMeal, selectedDate, setSelectedDate } = useApp();
  
  // Get today's meals
  const startOfDay = new Date(selectedDate);
  startOfDay.setHours(0, 0, 0, 0);
  
  const endOfDay = new Date(selectedDate);
  endOfDay.setHours(23, 59, 59, 999);
  
  const todaysMeals = meals
    .filter(meal => meal.timestamp >= startOfDay.getTime() && meal.timestamp <= endOfDay.getTime())
    .sort((a, b) => b.timestamp - a.timestamp);

  return (
    <div className="space-y-6">
      {/* Welcome section */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Welcome, {user.name}</h1>
        <DateSelector selectedDate={selectedDate} onChange={setSelectedDate} />
      </div>
      
      {/* Stats grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <NutritionCard nutrition={dailyNutrition} goals={user} />
        </div>
        <div className="bg-white rounded-xl shadow-sm p-5 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
            <Link
              to="/scan"
              className="w-full inline-flex items-center justify-center px-4 py-2.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              <Camera size={18} className="mr-2" />
              Scan Your Meal
            </Link>
          </div>
          
          <div className="mt-4">
            <Link
              to="/diary"
              className="w-full inline-flex items-center justify-center px-4 py-2.5 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              <TrendingUp size={18} className="mr-2" />
              View Progress
            </Link>
          </div>
        </div>
      </div>
      
      {/* Recent meals */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Meals</h2>
        {todaysMeals.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {todaysMeals.map(meal => (
              <MealCard 
                key={meal.id} 
                meal={meal} 
                onDelete={deleteMeal} 
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <p className="text-gray-500 mb-4">No meals logged for today</p>
            <Link
              to="/scan"
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              <Camera size={18} className="mr-2" />
              Scan Your First Meal
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;