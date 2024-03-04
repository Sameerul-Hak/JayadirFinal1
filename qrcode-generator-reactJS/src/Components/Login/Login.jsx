import React, { useState } from 'react';
import './Login.css'; // Corrected path for CSS file

const Login = () => {
  // State to hold input values
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Check if username and password match admin credentials
    if (username === 'admin' && password === 'admin') {
      // Do something when credentials are correct, for example, redirect to dashboard
      console.log('Login successful');
    } else {
      // Display error message for incorrect credentials
      setErrorMessage('Invalid username or password');
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-header">Login</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="username" className="form-label">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="form-label">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-input"
          />
        </div>
        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
  );
};

export default Login;
