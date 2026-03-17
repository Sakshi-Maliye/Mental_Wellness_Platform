import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <div className="container">
    <h1>AI-Powered Mental Wellness</h1>
    <p>Secure, 24/7 AI-enabled support for your mental health[cite: 14].</p>
    <div className="auth-buttons">
      <Link to="/signup" className="btn">Get Started</Link>
      <Link to="/login" className="btn btn-alt">Login</Link>
    </div>
  </div>
);

export default Home;