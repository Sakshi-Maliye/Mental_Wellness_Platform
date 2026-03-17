import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'user' });
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      // Ensure your backend is running on port 5000
      const res = await axios.post('http://localhost:5000/api/auth/register', formData);
      alert(res.data.msg);
      navigate('/login');
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.msg || "Registration Failed. Check if Backend is running.");
    }
  };

  return (
    <div className="container">
      <h2>Create Wellness Account</h2>
      <form onSubmit={handleSignup}>
        <input type="text" placeholder="Full Name" onChange={(e) => setFormData({...formData, name: e.target.value})} required />
        <input type="email" placeholder="Email Address" onChange={(e) => setFormData({...formData, email: e.target.value})} required />
        <input type="password" placeholder="Password" onChange={(e) => setFormData({...formData, password: e.target.value})} required />
        
        <label style={{ display: 'block', textAlign: 'left', marginTop: '10px' }}>Register As:</label>
        <select onChange={(e) => setFormData({...formData, role: e.target.value})} style={{ marginBottom: '20px' }}>
          <option value="user">Patient / Student</option>
          <option value="therapist">Therapist / Professional</option>
        </select>
        
        <button type="submit" className="btn">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;