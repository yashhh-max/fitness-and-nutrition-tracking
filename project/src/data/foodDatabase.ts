import { FoodItem } from '../types';

export interface FoodDatabase {
  id: string;
  name: string;
  per100g: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
}

export const foodDatabase: FoodDatabase[] = [
  {
    id: '1',
    name: 'Chicken Breast (Raw)',
    per100g: {
      calories: 120,
      protein: 23,
      carbs: 0,
      fat: 2.6
    }
  },
  {
    id: '2',
    name: 'Brown Rice (Cooked)',
    per100g: {
      calories: 123,
      protein: 2.7,
      carbs: 25.6,
      fat: 0.9
    }
  },
  {
    id: '3',
    name: 'Egg (Whole, Raw)',
    per100g: {
      calories: 143,
      protein: 12.6,
      carbs: 0.7,
      fat: 9.5
    }
  },
  {
    id: '4',
    name: 'Salmon (Raw)',
    per100g: {
      calories: 208,
      protein: 20,
      carbs: 0,
      fat: 13
    }
  },
  {
    id: '5',
    name: 'Sweet Potato (Raw)',
    per100g: {
      calories: 86,
      protein: 1.6,
      carbs: 20,
      fat: 0.1
    }
  },
  {
    id: '6',
    name: 'Greek Yogurt (Plain)',
    per100g: {
      calories: 59,
      protein: 10,
      carbs: 3.6,
      fat: 0.4
    }
  },
  {
    id: '7',
    name: 'Quinoa (Cooked)',
    per100g: {
      calories: 120,
      protein: 4.4,
      carbs: 21.3,
      fat: 1.9
    }
  },
  {
    id: '8',
    name: 'Avocado',
    per100g: {
      calories: 160,
      protein: 2,
      carbs: 8.5,
      fat: 14.7
    }
  },
  {
    id: '9',
    name: 'Banana',
    per100g: {
      calories: 89,
      protein: 1.1,
      carbs: 22.8,
      fat: 0.3
    }
  },
  {
    id: '10',
    name: 'Almonds',
    per100g: {
      calories: 579,
      protein: 21.2,
      carbs: 21.7,
      fat: 49.9
    }
  },
  {
    id: '11',
    name: 'Oatmeal (Cooked)',
    per100g: {
      calories: 71,
      protein: 2.5,
      carbs: 12,
      fat: 1.5
    }
  },
  {
    id: '12',
    name: 'Spinach (Raw)',
    per100g: {
      calories: 23,
      protein: 2.9,
      carbs: 3.6,
      fat: 0.4
    }
  },
  {
    id: '13',
    name: 'Beef Steak (Raw)',
    per100g: {
      calories: 271,
      protein: 26,
      carbs: 0,
      fat: 18
    }
  },
  {
    id: '14',
    name: 'Tofu (Firm)',
    per100g: {
      calories: 144,
      protein: 15.9,
      carbs: 3.3,
      fat: 8.7
    }
  },
  {
    id: '15',
    name: 'Lentils (Cooked)',
    per100g: {
      calories: 116,
      protein: 9,
      carbs: 20,
      fat: 0.4
    }
  },
  {
    id: '16',
    name: 'Broccoli (Raw)',
    per100g: {
      calories: 34,
      protein: 2.8,
      carbs: 6.6,
      fat: 0.4
    }
  },
  {
    id: '17',
    name: 'Cottage Cheese',
    per100g: {
      calories: 98,
      protein: 11,
      carbs: 3.4,
      fat: 4.3
    }
  },
  {
    id: '18',
    name: 'Peanut Butter',
    per100g: {
      calories: 588,
      protein: 25,
      carbs: 20,
      fat: 50
    }
  },
  {
    id: '19',
    name: 'Sweet Potato (Cooked)',
    per100g: {
      calories: 90,
      protein: 2,
      carbs: 20.7,
      fat: 0.2
    }
  },
  {
    id: '20',
    name: 'Black Beans (Cooked)',
    per100g: {
      calories: 132,
      protein: 8.9,
      carbs: 23.7,
      fat: 0.5
    }
  },
  {
    id: '21',
    name: 'Chickpeas (Cooked)',
    per100g: {
      calories: 164,
      protein: 8.9,
      carbs: 27.4,
      fat: 2.6
    }
  },
  {
    id: '22',
    name: 'Whey Protein Powder',
    per100g: {
      calories: 373,
      protein: 80,
      carbs: 7.8,
      fat: 7.5
    }
  },
  {
    id: '23',
    name: 'Olive Oil',
    per100g: {
      calories: 884,
      protein: 0,
      carbs: 0,
      fat: 100
    }
  },
  {
    id: '24',
    name: 'Apple',
    per100g: {
      calories: 52,
      protein: 0.3,
      carbs: 13.8,
      fat: 0.2
    }
  },
  {
    id: '25',
    name: 'Turkey Breast (Raw)',
    per100g: {
      calories: 104,
      protein: 24,
      carbs: 0,
      fat: 1
    }
  },
  {
    id: '26',
    name: 'Dal (Yellow, Cooked)',
    per100g: {
      calories: 132,
      protein: 9,
      carbs: 20,
      fat: 1.5
    }
  },
  {
    id: '27',
    name: 'Basmati Rice (Cooked)',
    per100g: {
      calories: 121,
      protein: 2.7,
      carbs: 28,
      fat: 0.3
    }
  },
  {
    id: '28',
    name: 'Paneer',
    per100g: {
      calories: 265,
      protein: 18.3,
      carbs: 3.4,
      fat: 20.8
    }
  },
  {
    id: '29',
    name: 'Chapati',
    per100g: {
      calories: 264,
      protein: 9,
      carbs: 55,
      fat: 1.2
    }
  }
];