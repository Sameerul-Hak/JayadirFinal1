import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';

function CertificateLogin() {
  const [phonenumber, setPhonenumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState('');
  const [id, setid] = useState('');
  const navigate=useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get('http://localhost:5000/alltablename');
        setTables(result.data); 
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const handleLogin = async () => {
    try {
      // Basic input validation
      if (!selectedTable || !phonenumber || !password) {
        setError('Please provide all required fields.');
        return;
      }
  
      // Fetch event ID
      const idResponse = await axios.post("http://localhost:5000/findeventid", {
        "choosentablename": selectedTable
      });
  
      // Extract event ID
      const eventId = idResponse.data.id;
  
      if (!eventId) {
        setError('Failed to retrieve event ID.');
        return;
      }
  
      // Perform login
      const loginResponse = await axios.post('http://localhost:5000/auth/login', {
        tablename: `${selectedTable}Attendance`,
        phonenumber,
        password,
      });
  
      if (loginResponse.status === 200) {
        // Successful login, navigate to the desired route
        navigate(`/createcertificate/${loginResponse.data.user.fullName}/${eventId}`);
      } else {
        setError('Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('Internal server error');
    }
  };
  
  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form>
        <br />
        <label>
          Phone Number:
          <input type="text" value={phonenumber} onChange={(e) => setPhonenumber(e.target.value)} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <label>
          Select Table:
          <select value={selectedTable} onChange={(e) => setSelectedTable(e.target.value)}>
            <option value="">Select a table</option>
            {tables.map((table, index) => (
              <option key={index} value={table}>
                {table}
              </option>
            ))}
          </select>
        </label>
        <br />
        <button type="button" onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
  );
}

export default CertificateLogin;
