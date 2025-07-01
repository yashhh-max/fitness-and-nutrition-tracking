import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import ScanFood from './pages/ScanFood';
import MealDiary from './pages/MealDiary';

function App() {
  return (
    <AppProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/scan" element={<ScanFood />} />
            <Route path="/diary" element={<MealDiary />} />
            <Route path="*" element={<Navigate replace to="/" />} />
          </Routes>
        </Layout>
      </Router>
    </AppProvider>
  );
}

export default App;