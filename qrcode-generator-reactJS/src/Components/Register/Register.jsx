import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom'; // Import Link from react-router-dom for navigation
import axios from 'axios';
import './Register.css'; // Import CSS file for styling
import url from '../../Config';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate=useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${url}/admin/register`, { username, password });
      alert('Admin registered successfully!');
      // Redirect to login page or handle navigation as needed
    } catch (error) {
      console.error('Error registering admin:', error);
      alert('Failed to register admin');
    }
  };

  return (
    <div className="admin-register-container">
      <h1>{searchParams.get('name')}</h1>
      <h1 className="admin-register-heading">Admin Register</h1>
      <form onSubmit={handleSubmit} className="admin-register-form">
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} className="admin-register-input" />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="admin-register-input" />
        <button type="submit" className="admin-register-button">Register</button>
      </form>
      <p className="admin-register-login-text">Already have an account? <Link to="/login">Login</Link></p>
      {/* <Link to=>get ur certificate</Link> */}
      <h1 onClick={()=>navigate(`/createcertificate/${searchParams.get('name')}`)}>get your certificate</h1>
    </div>
  );
};

export default Register;
