import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Plus, X } from 'lucide-react';
import { FoodItem } from '../types';
import FoodSearch from './FoodSearch';
import { FoodDatabase } from '../data/foodDatabase';

interface ManualFoodEntryProps {
  onAdd: (items: FoodItem[]) => void;
  onCancel: () => void;
}

const ManualFoodEntry: React.FC<ManualFoodEntryProps> = ({ onAdd, onCancel }) => {
  const [items, setItems] = useState<(FoodItem & { weight: number, per100g: { calories: number, protein: number, carbs: number, fat: number } })[]>([
    {
      id: uuidv4(),
      name: '',
      weight: 100,
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
      portion: '',
      per100g: {
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0
      }
    }
  ]);

  const handleInputChange = (index: number, field: string, value: string | number) => {
    const newItems = [...items];
    const item = { ...newItems[index] };

    if (field === 'weight' || field.startsWith('per100g.')) {
      const numValue = typeof value === 'string' ? parseFloat(value) || 0 : value;
      
      if (field === 'weight') {
        item.weight = numValue;
      } else {
        const nutrient = field.split('.')[1];
        item.per100g[nutrient as keyof typeof item.per100g] = numValue;
      }

      // Recalculate actual values based on weight
      item.calories = Math.round((item.per100g.calories * item.weight) / 100);
      item.protein = Math.round((item.per100g.protein * item.weight) / 100 * 10) / 10;
      item.carbs = Math.round((item.per100g.carbs * item.weight) / 100 * 10) / 10;
      item.fat = Math.round((item.per100g.fat * item.weight) / 100 * 10) / 10;
      item.portion = `${item.weight}g`;
    } else {
      (item as any)[field] = value;
    }

    newItems[index] = item;
    setItems(newItems);
  };

  const handleFoodSelect = (index: number, food: FoodDatabase) => {
    const newItems = [...items];
    const item = { ...newItems[index] };
    
    item.name = food.name;
    item.per100g = { ...food.per100g };
    
    // Recalculate nutrition based on current weight
    item.calories = Math.round((food.per100g.calories * item.weight) / 100);
    item.protein = Math.round((food.per100g.protein * item.weight) / 100 * 10) / 10;
    item.carbs = Math.round((food.per100g.carbs * item.weight) / 100 * 10) / 10;
    item.fat = Math.round((food.per100g.fat * item.weight) / 100 * 10) / 10;
    item.portion = `${item.weight}g`;
    
    newItems[index] = item;
    setItems(newItems);
  };

  const addItem = () => {
    setItems([...items, {
      id: uuidv4(),
      name: '',
      weight: 100,
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
      portion: '',
      per100g: {
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0
      }
    }]);
  };

  const removeItem = (index: number) => {
    if (items.length > 1) {
      const newItems = items.filter((_, i) => i !== index);
      setItems(newItems);
    }
  };

  const handleSubmit = () => {
    const validItems = items.filter(item => item.name && item.weight > 0);
    if (validItems.length > 0) {
      const foodItems: FoodItem[] = validItems.map(item => ({
        id: item.id,
        name: item.name,
        calories: item.calories,
        protein: item.protein,
        carbs: item.carbs,
        fat: item.fat,
        portion: `${item.weight}g`
      }));
      onAdd(foodItems);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Add Food Items</h3>
        <button
          onClick={onCancel}
          className="p-1.5 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
        >
          <X size={20} />
        </button>
      </div>

      <div className="space-y-6">
        {items.map((item, index) => (
          <div key={item.id} className="p-4 bg-gray-50 rounded-lg space-y-4">
            <div className="flex justify-between items-start gap-2">
              <div className="flex-1">
                <FoodSearch onSelect={(food) => handleFoodSelect(index, food)} />
              </div>
              {items.length > 1 && (
                <button
                  onClick={() => removeItem(index)}
                  className="p-2 text-gray-400 hover:text-red-500 rounded-full hover:bg-white"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {item.name && (
              <>
                <div className="text-sm font-medium text-gray-900">{item.name}</div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Weight (g)
                    </label>
                    <input
                      type="number"
                      value={item.weight}
                      onChange={(e) => handleInputChange(index, 'weight', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      min="0"
                    />
                  </div>
                </div>

                <div className="mt-2 p-3 bg-white rounded-md shadow-sm">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Nutrition for {item.weight}g</h4>
                  <div className="grid grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Calories:</span>
                      <span className="ml-1 font-medium">{item.calories}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Protein:</span>
                      <span className="ml-1 font-medium">{item.protein}g</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Carbs:</span>
                      <span className="ml-1 font-medium">{item.carbs}g</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Fat:</span>
                      <span className="ml-1 font-medium">{item.fat}g</span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        ))}

        <button
          onClick={addItem}
          className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Plus size={16} className="mr-2" />
          Add Another Item
        </button>

        <div className="flex justify-end space-x-3 pt-4 border-t">
          <button
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Add to Diary
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManualFoodEntry;