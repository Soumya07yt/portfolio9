import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Portfolio from './components/Portfolio';
import AdminDashboard from './components/AdminDashboard';
import Login from './components/Login';
import { AuthProvider } from './contexts/AuthContext';
import './App.css';

function App() {
  useEffect(() => {
    // Initialize GSAP and other animations
    document.body.classList.add('loaded');
  }, []);

  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Portfolio />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/login" element={<Login />} />
          </Routes>
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#1f2937',
                color: '#f9fafb',
                border: '1px solid #374151',
              },
            }}
          />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;