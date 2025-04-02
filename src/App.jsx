import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import TopUsers from './component/TopUsers';
import TrendingPosts from './component/TrendingPosts';
import Feed from './component/Feed';
import Navigation from './component/Navigation';
import './App.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50">
        <Navigation />
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-center my-6 text-indigo-700">Social Media App</h1>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <Routes>
                <Route path="/top-users" element={<TopUsers />} />
                <Route path="/trending" element={<TrendingPosts />} />
                <Route path="/feed" element={<Feed />} />
                <Route path="*" element={<Navigate to="/feed" replace />} />
              </Routes>
            </div>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;