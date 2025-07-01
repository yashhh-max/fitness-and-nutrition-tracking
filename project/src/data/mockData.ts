import { Meal } from '../types';

// Generate timestamps for the past few days
const today = new Date();
const yesterday = new Date(today);
yesterday.setDate(yesterday.getDate() - 1);
const twoDaysAgo = new Date(today);
twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

export const mockMeals: Meal[] = [
  {
    id: '1',
    name: 'Grilled Chicken Salad',
    imageUrl: 'https://images.pexels.com/photos/5938/food-salad-healthy-lunch.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    timestamp: today.getTime(),
    calories: 350,
    protein: 40,
    carbs: 15,
    fat: 12,
    items: [
      {
        id: '1-1',
        name: 'Grilled Chicken Breast',
        calories: 165,
        protein: 31,
        carbs: 0,
        fat: 3.6,
        portion: '100g',
      },
      {
        id: '1-2',
        name: 'Mixed Greens',
        calories: 15,
        protein: 1,
        carbs: 3,
        fat: 0,
        portion: '50g',
      },
      {
        id: '1-3',
        name: 'Olive Oil Dressing',
        calories: 120,
        protein: 0,
        carbs: 0,
        fat: 14,
        portion: '15ml',
      },
    ],
  },
  {
    id: '2',
    name: 'Protein Smoothie',
    imageUrl: 'https://images.pexels.com/photos/434258/pexels-photo-434258.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    timestamp: today.getTime() - 4 * 3600 * 1000, // 4 hours ago
    calories: 220,
    protein: 25,
    carbs: 20,
    fat: 3,
    items: [
      {
        id: '2-1',
        name: 'Whey Protein',
        calories: 120,
        protein: 24,
        carbs: 3,
        fat: 1,
        portion: '30g',
      },
      {
        id: '2-2',
        name: 'Banana',
        calories: 100,
        protein: 1,
        carbs: 27,
        fat: 0,
        portion: '1 medium',
      },
    ],
  },
  {
    id: '3',
    name: 'Salmon with Rice',
    imageUrl: 'https://images.pexels.com/photos/1824353/pexels-photo-1824353.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    timestamp: yesterday.getTime(),
    calories: 520,
    protein: 35,
    carbs: 45,
    fat: 22,
    items: [
      {
        id: '3-1',
        name: 'Salmon Fillet',
        calories: 280,
        protein: 31,
        carbs: 0,
        fat: 18,
        portion: '120g',
      },
      {
        id: '3-2',
        name: 'Brown Rice',
        calories: 240,
        protein: 4,
        carbs: 45,
        fat: 4,
        portion: '150g',
      },
    ],
  },
  {
    id: '4',
    name: 'Oatmeal with Berries',
    imageUrl: 'https://images.pexels.com/photos/4092093/pexels-photo-4092093.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    timestamp: twoDaysAgo.getTime(),
    calories: 320,
    protein: 10,
    carbs: 55,
    fat: 8,
    items: [
      {
        id: '4-1',
        name: 'Rolled Oats',
        calories: 180,
        protein: 6,
        carbs: 32,
        fat: 3,
        portion: '50g',
      },
      {
        id: '4-2',
        name: 'Mixed Berries',
        calories: 70,
        protein: 1,
        carbs: 16,
        fat: 0,
        portion: '100g',
      },
      {
        id: '4-3',
        name: 'Almond Milk',
        calories: 30,
        protein: 1,
        carbs: 1,
        fat: 2.5,
        portion: '200ml',
      },
    ],
  },
];