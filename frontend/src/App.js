import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import UserDashboard from './pages/UserDashboard';
import TherapistDashboard from './pages/TherapistDashboard';
import './App.css';

function App() {
  return (
    <Router>
      <nav className="navbar">
        <Link to="/" className="logo">WellnessAI</Link>
        <div className="nav-links">
          {/* These links let you navigate to the features */}
          <Link to="/user-dashboard">User Panel (Chat & Book)</Link>
          <Link to="/therapist-dashboard">Therapist Panel</Link>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        {/* These routes MUST match the links above */}
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/therapist-dashboard" element={<TherapistDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;