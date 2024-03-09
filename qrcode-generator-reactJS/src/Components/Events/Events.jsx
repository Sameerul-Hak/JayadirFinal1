import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
// import './Events.css';
import url from '../../Config';

const Events = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get(`${url}/events/allevents`);
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };
  const handleon = async (eventId) => {
    console.log(`clicked on`);
    try {
      const response =await axios.get(`${url}/candistributeOn/${eventId}`);
      alert(response.data.message);
    } catch (error) {
      console.error('Error turning on certificate:', error);
    }
  };

  const handleoff = async (eventId) => {
    try {
      const response =await axios.get(`${url}/candistributeOff/${eventId}`);
      alert(response.data.message);

    } catch (error) {
      console.error('Error turning off certificate:', error);
    }
  };
  return (
    <div className='eventsbg'>
      <div className='events_top'>
        <div className='eventshead'>
          <h1 className='events_heading'>EVENTS</h1>
        </div>
        <Link to='/createevent'><button className='event_btn'>Add Event</button></Link>
      </div>
      <div className='events_btm'>
        {events.map(event => (
          <div key={event.eventId} className='event_card'>
            <h2 className='event_name'>{event.eventName}</h2>
            <p className='event_details'>
              <strong className='detail_label'>Description:</strong> {event.eventDescription}<br />
              <strong className='detail_label'>Timing:</strong> {event.eventTiming}<br />
              <strong className='detail_label'>Day:</strong> {event.eventDay}<br />
              <strong className='detail_label'>Location:</strong> {event.eventLocation}
            </p>
            <div className="button-group">
              <Link to={`/qrcode/${event.eventName}/:Others`} className="Link">
                <button className='generate_qr_btn'>Generate QR Code Others</button>
              </Link>
              <Link to={`/qrcode/${event.eventName}/:Teacher`} className="Link">
                <button className='generate_qr_btn'>Generate QR Code for Teacher</button>
              </Link>
              <Link to={`/qrcode/${event.eventName}/:Student`} className="Link">
                <button className='generate_qr_btn'>Generate QR Code for Student</button>
              </Link>
              <Link to={`/attendance/${event.eventName}`}>
                <button className='attendance_btn'>Get Attendance</button>
              </Link>
              <button onClick={() => handleon(event.eventId)}>On Certificate</button>
              <button onClick={() => handleoff(event.eventId)}>Off Certificate</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Events;
