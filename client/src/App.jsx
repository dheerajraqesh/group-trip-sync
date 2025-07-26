import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <h1 className="text-2xl font-bold text-gray-900">Group Trip Sync</h1>
              </div>
              <nav className="flex space-x-8">
                <a href="/" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  Home
                </a>
                <a href="/dashboard" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  Dashboard
                </a>
              </nav>
            </div>
          </div>
        </header>
        
        {/* Main Content */}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;