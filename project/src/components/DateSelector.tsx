import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface DateSelectorProps {
  selectedDate: Date;
  onChange: (date: Date) => void;
}

const DateSelector: React.FC<DateSelectorProps> = ({ selectedDate, onChange }) => {
  const formatDate = (date: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short', 
        day: 'numeric'
      });
    }
  };

  const goToPreviousDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() - 1);
    onChange(newDate);
  };

  const goToNextDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + 1);
    const today = new Date();
    
    // Prevent going to future dates
    if (newDate <= today) {
      onChange(newDate);
    }
  };

  const isToday = () => {
    const today = new Date();
    return selectedDate.toDateString() === today.toDateString();
  };

  return (
    <div className="flex items-center justify-between bg-white rounded-lg shadow-sm p-3">
      <button
        onClick={goToPreviousDay}
        className="p-1.5 rounded-full hover:bg-gray-100 text-gray-600 transition-colors"
      >
        <ChevronLeft size={20} />
      </button>
      
      <h2 className="text-base font-medium text-gray-800">{formatDate(selectedDate)}</h2>
      
      <button
        onClick={goToNextDay}
        disabled={isToday()}
        className={`p-1.5 rounded-full ${
          isToday() ? 'text-gray-300 cursor-not-allowed' : 'hover:bg-gray-100 text-gray-600'
        } transition-colors`}
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
};

export default DateSelector;