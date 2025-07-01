import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Camera, Upload, Loader2, Check, X, Plus } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import ManualFoodEntry from '../components/ManualFoodEntry';
import { FoodItem } from '../types';

const ScanFood: React.FC = () => {
  const navigate = useNavigate();
  const { detectFood, addMeal } = useApp();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [image, setImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [showManualEntry, setShowManualEntry] = useState(false);
  const [detectedFood, setDetectedFood] = useState<{
    items: string[];
    nutrition: {
      calories: number;
      protein: number;
      carbs: number;
      fat: number;
    };
  } | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      setIsAnalyzing(false);
      setAnalysisComplete(false);
      setDetectedFood(null);
    }
  };

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
        audio: false
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        setStream(mediaStream);
        setIsCameraActive(true);
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      alert('Unable to access camera. Please check permissions.');
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setIsCameraActive(false);
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageUrl = canvas.toDataURL('image/jpeg');
        setImage(imageUrl);
        stopCamera();
      }
    }
  };

  const analyzeImage = async () => {
    if (!image) return;
    
    setIsAnalyzing(true);
    
    try {
      const result = await detectFood(image);
      
      setDetectedFood({
        items: result.foodItems,
        nutrition: result.nutritionInfo
      });
      
      setIsAnalyzing(false);
      setAnalysisComplete(true);
    } catch (error) {
      console.error('Error analyzing image:', error);
      setIsAnalyzing(false);
      alert('An error occurred while analyzing the image. Please try again.');
    }
  };

  const handleAddToDiary = () => {
    if (detectedFood && image) {
      const newMeal = {
        id: uuidv4(),
        name: detectedFood.items.join(', '),
        imageUrl: image,
        timestamp: new Date().getTime(),
        calories: detectedFood.nutrition.calories,
        protein: detectedFood.nutrition.protein,
        carbs: detectedFood.nutrition.carbs,
        fat: detectedFood.nutrition.fat,
        items: detectedFood.items.map((item, index) => ({
          id: `${uuidv4()}-${index}`,
          name: item,
          calories: Math.round(detectedFood.nutrition.calories / detectedFood.items.length),
          protein: Math.round(detectedFood.nutrition.protein / detectedFood.items.length),
          carbs: Math.round(detectedFood.nutrition.carbs / detectedFood.items.length),
          fat: Math.round(detectedFood.nutrition.fat / detectedFood.items.length),
          portion: 'standard serving'
        }))
      };
      
      addMeal(newMeal);
      navigate('/');
    }
  };

  const handleManualAdd = (items: FoodItem[]) => {
    const totalNutrition = items.reduce(
      (acc, item) => ({
        calories: acc.calories + item.calories,
        protein: acc.protein + item.protein,
        carbs: acc.carbs + item.carbs,
        fat: acc.fat + item.fat
      }),
      { calories: 0, protein: 0, carbs: 0, fat: 0 }
    );

    const newMeal = {
      id: uuidv4(),
      name: items.map(item => item.name).join(', '),
      imageUrl: 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      timestamp: new Date().getTime(),
      ...totalNutrition,
      items
    };

    addMeal(newMeal);
    navigate('/');
  };

  const resetState = () => {
    setImage(null);
    setAnalysisComplete(false);
    setDetectedFood(null);
    stopCamera();
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Add Food</h1>
        <button
          onClick={() => setShowManualEntry(true)}
          className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Plus size={16} className="mr-2" />
          Manual Entry
        </button>
      </div>

      {showManualEntry ? (
        <ManualFoodEntry
          onAdd={handleManualAdd}
          onCancel={() => setShowManualEntry(false)}
        />
      ) : (
        <>
          <canvas ref={canvasRef} className="hidden" />
          
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            {!image && !isCameraActive ? (
              <div className="h-64 flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-lg">
                <p className="text-gray-500 mb-4">Take a photo of your meal or upload an image</p>
                <div className="flex space-x-4">
                  <button
                    onClick={startCamera}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <Camera size={18} className="mr-2" />
                    Take Photo
                  </button>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <Upload size={18} className="mr-2" />
                    Upload Image
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </div>
              </div>
            ) : isCameraActive ? (
              <div className="relative">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-full h-auto max-h-96 object-cover"
                />
                <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-4">
                  <button
                    onClick={capturePhoto}
                    className="p-3 bg-white rounded-full shadow-lg text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    <Camera size={24} />
                  </button>
                  <button
                    onClick={stopCamera}
                    className="p-3 bg-white rounded-full shadow-lg text-gray-600 hover:text-gray-700 transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>
              </div>
            ) : (
              <div className="relative">
                <img src={image} alt="Food" className="w-full h-auto max-h-96 object-cover" />
                <div className="absolute top-2 right-2">
                  <button
                    onClick={resetState}
                    className="p-1.5 bg-white rounded-full shadow-sm text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>
            )}
          </div>
          
          {image && !isAnalyzing && !analysisComplete && (
            <div className="flex justify-center">
              <button
                onClick={analyzeImage}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Analyze Food
              </button>
            </div>
          )}
          
          {isAnalyzing && (
            <div className="bg-white rounded-xl shadow-sm p-6 text-center">
              <Loader2 size={36} className="mx-auto animate-spin text-blue-600 mb-3" />
              <p className="font-medium text-gray-800">Analyzing your food...</p>
              <p className="text-sm text-gray-500 mt-1">This might take a moment</p>
            </div>
          )}
          
          {analysisComplete && detectedFood && (
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <Check size={24} className="text-green-500 mr-2" />
                  <h2 className="text-xl font-semibold text-gray-800">Results</h2>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Detected Food</h3>
                    <ul className="mt-1 text-gray-800">
                      {detectedFood.items.map((item, index) => (
                        <li key={index} className="text-lg font-medium">{item}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="border-t border-gray-100 pt-4">
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Nutritional Information</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-blue-50 rounded-lg p-3">
                        <p className="text-sm text-gray-500">Calories</p>
                        <p className="text-xl font-semibold text-gray-800">{detectedFood.nutrition.calories} kcal</p>
                      </div>
                      <div className="bg-green-50 rounded-lg p-3">
                        <p className="text-sm text-gray-500">Protein</p>
                        <p className="text-xl font-semibold text-gray-800">{detectedFood.nutrition.protein}g</p>
                      </div>
                      <div className="bg-yellow-50 rounded-lg p-3">
                        <p className="text-sm text-gray-500">Carbs</p>
                        <p className="text-xl font-semibold text-gray-800">{detectedFood.nutrition.carbs}g</p>
                      </div>
                      <div className="bg-red-50 rounded-lg p-3">
                        <p className="text-sm text-gray-500">Fat</p>
                        <p className="text-xl font-semibold text-gray-800">{detectedFood.nutrition.fat}g</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-center mt-6">
                    <button
                      onClick={handleAddToDiary}
                      className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Add to Diary
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ScanFood;