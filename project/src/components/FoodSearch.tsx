import React, { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import { FoodDatabase, foodDatabase } from '../data/foodDatabase';

interface FoodSearchProps {
  onSelect: (food: FoodDatabase) => void;
}

const FoodSearch: React.FC<FoodSearchProps> = ({ onSelect }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<FoodDatabase[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (value: string) => {
    setQuery(value);
    if (value.trim() === '') {
      setResults([]);
      return;
    }

    const searchResults = foodDatabase.filter(food =>
      food.name.toLowerCase().includes(value.toLowerCase())
    );
    setResults(searchResults);
    setIsOpen(true);
  };

  const handleSelect = (food: FoodDatabase) => {
    onSelect(food);
    setQuery('');
    setResults([]);
    setIsOpen(false);
  };

  return (
    <div ref={wrapperRef} className="relative">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search for a food..."
          className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
        <Search 
          size={18} 
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        />
      </div>

      {isOpen && results.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg max-h-60 overflow-auto">
          {results.map((food) => (
            <button
              key={food.id}
              onClick={() => handleSelect(food)}
              className="w-full text-left px-4 py-2 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
            >
              <div className="font-medium text-gray-900">{food.name}</div>
              <div className="text-sm text-gray-500">
                {food.per100g.calories} kcal | {food.per100g.protein}g protein per 100g
              </div>
            </button>
          ))}
        </div>
      )}

      {isOpen && query && results.length === 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg p-4 text-center text-gray-500">
          No foods found
        </div>
      )}
    </div>
  );
};

export default FoodSearch;