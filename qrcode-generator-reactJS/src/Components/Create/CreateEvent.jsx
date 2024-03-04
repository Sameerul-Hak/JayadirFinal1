import React, { useState } from 'react';
import './CreateEvent.css';
import axios from 'axios';

const CreateEvent = () => {
  const [eventName, setEventName] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventTiming, setEventTiming] = useState('');
  const [eventDay, setEventDay] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/events/createevent', {
        eventName,
        eventDescription,
        eventTiming,
        eventDay,
        eventLocation
      });
      console.log(response.data); // Log the response from the server
      // Clear form fields after successful submission
      setEventName('');
      setEventDescription('');
      setEventTiming('');
      setEventDay('');
      setEventLocation('');
      setErrorMessage('');
    } catch (error) {
      console.error('Error creating event:', error);
      setErrorMessage('Failed to create event. Please try again.');
    }
  };

  return (
    <div className='create_bg'>
      <div className='create_top'>
        <h1 className='create_head'>Create An Event</h1>
      </div>
      <div className='create_btm'>
        {errorMessage && <p className='error_message'>{errorMessage}</p>}
        <form className='event_form' onSubmit={handleSubmit}>
          <div className='form_group'>
            <label htmlFor='eventName' className='form_label'>Event Name:</label>
            <input
              type='text'
              id='eventName'
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              className='form_input'
              required
            />
          </div>
          <div className='form_group'>
            <label htmlFor='eventDescription' className='form_label'>Event Description:</label>
            <textarea
              id='eventDescription'
              value={eventDescription}
              onChange={(e) => setEventDescription(e.target.value)}
              className='form_input'
              rows='4'
            ></textarea>
          </div>
          <div className='form_group'>
            <label htmlFor='eventTiming' className='form_label'>Event Timing:</label>
            <input
              type='text'
              id='eventTiming'
              value={eventTiming}
              onChange={(e) => setEventTiming(e.target.value)}
              className='form_input'
              required
            />
          </div>
          <div className='form_group'>
            <label htmlFor='eventDay' className='form_label'>Event Day:</label>
            <input
              type='date'
              id='eventDay'
              value={eventDay}
              onChange={(e) => setEventDay(e.target.value)}
              className='form_input'
              required
            />
          </div>
          <div className='form_group'>
            <label htmlFor='eventLocation' className='form_label'>Event Location:</label>
            <input
              type='text'
              id='eventLocation'
              value={eventLocation}
              onChange={(e) => setEventLocation(e.target.value)}
              className='form_input'
              required
            />
          </div>
          <button type='submit' className='submit_button'>Create Event</button>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;
