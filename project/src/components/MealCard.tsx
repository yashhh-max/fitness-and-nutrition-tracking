import React, { useState } from 'react';
import { Meal } from '../types';
import { Trash2, ChevronDown, ChevronUp } from 'lucide-react';

interface MealCardProps {
  meal: Meal;
  onDelete: (id: string) => void;
  showDetails?: boolean;
}

const MealCard: React.FC<MealCardProps> = ({ meal, onDelete, showDetails = false }) => {
  const [expanded, setExpanded] = useState(showDetails);
  
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
      <div className="flex items-center">
        <div className="h-16 w-16 sm:h-20 sm:w-20 flex-shrink-0">
          <img 
            src={meal.imageUrl} 
            alt={meal.name} 
            className="h-full w-full object-cover"
          />
        </div>
        
        <div className="flex-1 p-3 sm:p-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium text-gray-900">{meal.name}</h3>
              <p className="text-sm text-gray-500">{formatDate(meal.timestamp)}</p>
            </div>
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => onDelete(meal.id)}
                className="p-1.5 text-gray-400 hover:text-red-500 rounded-full hover:bg-gray-100 transition-colors"
              >
                <Trash2 size={16} />
              </button>
              <button 
                onClick={() => setExpanded(!expanded)}
                className="p-1.5 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
              >
                {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
            </div>
          </div>
          
          <div className="mt-1 flex space-x-3 text-sm">
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              {meal.calories} kcal
            </span>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              {meal.protein}g protein
            </span>
          </div>
        </div>
      </div>
      
      {expanded && meal.items && (
        <div className="px-4 pb-4 pt-2 border-t border-gray-100">
          <p className="text-sm font-medium text-gray-700 mb-2">Food Items:</p>
          <ul className="space-y-2">
            {meal.items.map((item) => (
              <li key={item.id} className="text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-800">{item.name} ({item.portion})</span>
                  <span className="text-gray-600">{item.calories} kcal</span>
                </div>
                <div className="text-xs text-gray-500 mt-0.5">
                  Protein: {item.protein}g • Carbs: {item.carbs}g • Fat: {item.fat}g
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MealCard;