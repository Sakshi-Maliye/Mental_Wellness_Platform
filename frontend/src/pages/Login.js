import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      
      // Save data to localStorage for the Dashboards to use
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));

      alert("Login Successful!");

      // Redirect based on role in MongoDB
      if (res.data.user.role === 'therapist') {
        navigate('/therapist-dashboard');
      } else {
        navigate('/user-dashboard');
      }
    } catch (err) {
      alert(err.response?.data?.msg || "Invalid Credentials");
    }
  };

  return (
    <div className="container">
      <h2>Login to Portal</h2>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit" className="btn">Login</button>
      </form>
    </div>
  );
};

export default Login;