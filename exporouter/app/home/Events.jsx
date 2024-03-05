import { View, Text, Button, TouchableOpacity, Linking } from 'react-native';
import React, { useState, useEffect } from 'react';
import { router } from 'expo-router';
import axios from 'axios';
import url from '../../config';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useContext } from 'react';
import { Context } from '../../Context';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Events = () => {
  const [events, setEvents] = useState([]);
  const { user, setuser } = useContext(Context);
  const [myAttendanceEvents, setMyAttendanceEvents] = useState([]);

  useEffect(() => {
    const fetchEventsAndAttendance = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');

        const eventsResponse = await axios.get(`${url}/events/allevents`);
        setEvents(eventsResponse.data);

        const attendanceResponse = await axios.post(`${url}/attendance/myattendance`, { userId });
        setMyAttendanceEvents(attendanceResponse.data.eventIds || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchEventsAndAttendance();
  }, []);

  const handleAttendance = (eventId) => {
    router.push({
      pathname: `/camera/${eventId}`,
      // state: { eventid: eventId },
    });
  };

  const handleCertificate = async (eventId) => {
    const isEventInAttendance = myAttendanceEvents.includes(eventId);

    if (isEventInAttendance) {
      const username = await AsyncStorage.getItem('username');
      Linking.openURL(`http://localhost:3000/createcertificate/${username}`);
      console.log(username);
    } else {
      // Handle case where the event is not in attendance
      console.log("You can't get a certificate for an event you haven't attended.");
    }
  };

  return (
    <SafeAreaView>
      {events.map((event) => (
        <View key={event.eventId}>
          <Text>{event.eventName}</Text>
          <Text>{event.eventDescription}</Text>
          <Text>{event.eventLocation}</Text>
          <Text>{event.eventDay}</Text>
          <Text>{event.eventTiming}</Text>
          <Button title={myAttendanceEvents.includes(event.eventId)?"getCertificate":"Not available"} onPress={() => handleCertificate(event.eventId)} />
          <Button title="Attendance" onPress={() => handleAttendance(event.eventId)} />
        </View>
      ))}
      <View></View>
    </SafeAreaView>
  );
};

export default Events;
