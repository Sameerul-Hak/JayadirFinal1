import React, { useEffect, useState } from 'react';
import './Events.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Events = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/events/allevent');
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
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
            <button className='generate_qr_btn'>Generate QR Code</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Events;
