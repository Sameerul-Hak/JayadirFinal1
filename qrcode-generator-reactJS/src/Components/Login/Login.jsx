import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate from react-router-dom for navigation
import axios from 'axios';
import './Login.css'; // Import CSS file for styling
import url from '../../Config';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${url}/admin/login`, { username, password });
      alert('Login successful!');
      // Redirect to desired page upon successful login
      navigate('/events'); // Navigate to the Events page
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Invalid credentials');
    }
  };

  return (
    <div className="admin-login-page">
    <div className="admin-login-container">
      <h1 className="admin-login-heading">Admin Login</h1>
      <form onSubmit={handleSubmit} className="admin-login-form">
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} className="admin-login-input" />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="admin-login-input" />
        <button type="submit" className="admin-login-button">Login</button>
      </form>
      <p className="admin-login-register-text">Do not have an account? <Link to="/register">Register</Link></p>
    </div>
    </div>
  );
};

export default Login;
