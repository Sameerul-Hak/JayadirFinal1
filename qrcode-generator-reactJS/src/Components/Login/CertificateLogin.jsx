import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import "./certificate.css"
import url from '../../Config';
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
        const result = await axios.get(`${url}/alltablename`);
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
      const idResponse = await axios.post(`${url}/findeventid`, {
        "choosentablename": selectedTable
      });
  
      // Extract event ID
      const eventId = idResponse.data.id;
  
      if (!eventId) {
        setError('Failed to retrieve event ID.');
        return;
      }
  
      // Perform login
      const loginResponse = await axios.post(`${url}/auth/login`, {
        tablename: `${selectedTable}Attendance`,
        phonenumber,
        password,
      });
  
      if (loginResponse.status === 200) {
        localStorage.setItem('userToken', loginResponse.data.token);
        localStorage.setItem('userId', loginResponse.data.user.id);
        localStorage.setItem('eventId', eventId);
        if(loginResponse.data.user.whoami=='others')
        {

          navigate(`/createcertificate/${loginResponse.data.user.fullName}/${eventId}/others/${loginResponse.data.user.icNumber}`);
        }
        // Successful login, navigate to the desired route
        else if(loginResponse.data.user.whoami=='student' || loginResponse.data.user.whoami=='teacher')navigate(`/createcertificate/${loginResponse.data.user.fullName}/${eventId}/${loginResponse.data.user.icNumber}`);
      } else {
        setError('Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('Internal server error');
    }
  };
  
  return (
    <div className="admin-login-page">
    <div className="certificate-login-container">
    <h2 className="certificate-login-heading">Login</h2>
    {error && <p className="error-message">{error}</p>}
    <form>
      <label className="input-label">
        Phone Number:
        <input type="text" value={phonenumber} onChange={(e) => setPhonenumber(e.target.value)} className="input-field" />
      </label>
      <label className="input-label">
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input-field" />
      </label>
      <label className="input-label">
        Select Table:
        <select value={selectedTable} onChange={(e) => setSelectedTable(e.target.value)} className="input-field">
          <option value="">Select a table</option>
          {tables.map((table, index) => (
            <option key={index} value={table}>
              {table}
            </option>
          ))}
        </select>
      </label>
      <button type="button" onClick={handleLogin} className="login-button">
        Login
      </button>
      <div onClick={()=>navigate('/certificateLoging/forget')}>
        Forget password?
      </div>
    </form>
  </div>
  </div>
  );
}

export default CertificateLogin;
