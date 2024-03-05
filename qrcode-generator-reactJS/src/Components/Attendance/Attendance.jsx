import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './Attendance.css';

const Attendance = () => {
  const [attendance, setAttendance] = useState([]);
  const { eventId } = useParams();

  useEffect(() => {
    fetchAttendance();
  }, [eventId]);

  const fetchAttendance = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/attendance/attendance/event/${eventId}`);
      setAttendance(response.data);
    } catch (error) {
      console.error('Error fetching attendance:', error);
    }
  };

  return (
    <div className="attendance-container">
      <h1 className="attendance-heading">Attendance</h1>
      <table className="attendance-table">
        <thead>
          <tr>
            <th className="attendance-header">Attendance ID</th>
            <th className="attendance-header">User Full Name</th>
            <th className="attendance-header">School Name</th>
            <th className="attendance-header">State</th>
            <th className="attendance-header">District</th>
            <th className="attendance-header">Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {attendance.map(entry => (
            <tr key={entry.attendanceId} className="attendance-row">
              <td className="attendance-data">{entry.attendanceId}</td>
              <td className="attendance-data">{entry.user ? entry.user.fullName : 'N/A'}</td>
              <td className="attendance-data">{entry.user ? entry.user.schoolName : 'N/A'}</td>
              <td className="attendance-data">{entry.user ? entry.user.state : 'N/A'}</td>
              <td className="attendance-data">{entry.user ? entry.user.district : 'N/A'}</td>
              <td className="attendance-data">{entry.user ? entry.user.phonenumber : 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Attendance;
