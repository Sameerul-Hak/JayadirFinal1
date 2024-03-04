import { View, Text, Button } from 'react-native';
import React, { useState, useEffect } from 'react';
import { router } from 'expo-router';
import axios from 'axios';
import url from '../../config';

const Events = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get(`${url}/events/allevents`)
      .then((response) => {
        setEvents(response.data);
        console.log(response.data)
      })
      .catch(error => console.error('Error fetching events:', error));
  }, []);

  const handleAttendance = (eventId) => {
    router.push({
      pathname: `/camera/${eventId}`,
      // state: { eventid: eventId },
    });
  }

  return (
    <View>
      {events.map(event => (
        <View key={event.eventId}>
          <Text>{event.eventName}</Text>
          <Text>{event.eventDescription}</Text>
          <Text>{event.eventLocation}</Text>
          <Text>{event.eventDay}</Text>
          <Text>{event.eventTiming}</Text>
          <Button title='Attendance' onPress={() => handleAttendance(event.eventId)} />
        </View>
      ))}
    </View>
  );
}

export default Events;
