import { View, Text, Button } from 'react-native';
import React, { useState, useEffect } from 'react';
import { router } from 'expo-router';
import axios from 'axios';
import url from '../../config';
import { SafeAreaView } from 'react-native-safe-area-context';

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
    <SafeAreaView>
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
    </SafeAreaView>
  );
}

export default Events;
