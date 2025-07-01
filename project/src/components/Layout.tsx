import React from 'react';
import { useState } from 'react';
import { Home, Camera, BookOpen, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-blue-600">BEFIT</h1>
          </div>
          
          <button 
            className="md:hidden p-2 rounded-md text-gray-500 hover:text-gray-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          
          <nav className="hidden md:flex space-x-8">
            <Link 
              to="/" 
              className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium ${isActive('/') ? 'text-blue-600 bg-blue-50' : 'text-gray-500 hover:text-gray-900'}`}
            >
              <Home size={18} />
              <span>Dashboard</span>
            </Link>
            <Link 
              to="/scan" 
              className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium ${isActive('/scan') ? 'text-blue-600 bg-blue-50' : 'text-gray-500 hover:text-gray-900'}`}
            >
              <Camera size={18} />
              <span>Scan Food</span>
            </Link>
            <Link 
              to="/diary" 
              className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium ${isActive('/diary') ? 'text-blue-600 bg-blue-50' : 'text-gray-500 hover:text-gray-900'}`}
            >
              <BookOpen size={18} />
              <span>Meal Diary</span>
            </Link>
          </nav>
        </div>
      </header>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-md z-20">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link 
              to="/" 
              className={`flex items-center space-x-3 px-3 py-3 rounded-md text-base font-medium ${isActive('/') ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:bg-gray-50'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              <Home size={20} />
              <span>Dashboard</span>
            </Link>
            <Link 
              to="/scan" 
              className={`flex items-center space-x-3 px-3 py-3 rounded-md text-base font-medium ${isActive('/scan') ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:bg-gray-50'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              <Camera size={20} />
              <span>Scan Food</span>
            </Link>
            <Link 
              to="/diary" 
              className={`flex items-center space-x-3 px-3 py-3 rounded-md text-base font-medium ${isActive('/diary') ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:bg-gray-50'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              <BookOpen size={20} />
              <span>Meal Diary</span>
            </Link>
          </div>
        </div>
      )}

      {/* Main content */}
      <main className="flex-1 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-center text-gray-500">
            &copy; {new Date().getFullYear()} BEFIT. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;