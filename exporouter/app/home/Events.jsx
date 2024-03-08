import React, { useState, useEffect } from 'react';
import { View, Text, Button, TouchableOpacity, Linking, StyleSheet, ScrollView } from 'react-native';
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
        const usernameof = await AsyncStorage.getItem('username');
        setuser({userId:userId,username:usernameof})

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
      Linking.openURL(`https://65e81aacd1619cd70b61ff60--celebrated-liger-c03aa5.netlify.app/?name=${username}`);
      console.log(username);
    } else {
      console.log("You can't get a certificate for an event you haven't attended.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
            <Text style={{alignSelf:"center",fontSize:30,fontWeight:'bold',marginBottom:10}}>Events</Text>

      <ScrollView>
      {events.map((event) => (
        <View key={event.eventId} style={styles.eventContainer}>
          <Text style={styles.eventName}>{event.eventName}</Text>
          <Text style={styles.eventDescription}>{event.eventDescription}</Text>
          <Text style={styles.eventLocation}>{event.eventLocation}</Text>
          <Text>{event.eventDay}</Text>
          <Text>{event.eventTiming}</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleCertificate(event.eventId)}
            disabled={!myAttendanceEvents.includes(event.eventId)}
          >
            <Text style={styles.buttonText}>Get Certificate</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleAttendance(event.eventId)}
          >
            <Text style={styles.buttonText}>Attendance</Text>
          </TouchableOpacity>
        </View>
      ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  eventContainer: {
    marginBottom: 20,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
  },
  eventName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  eventDescription: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
  },
  eventLocation: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Events;
