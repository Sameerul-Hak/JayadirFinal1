import { View, Text, Button, Alert } from 'react-native';
import React, { useContext } from 'react';
import { router } from 'expo-router';
import { Context } from '../../Context';
import AsyncStorage from '@react-native-async-storage/async-storage';

const All = () => {
  const { user, setuser } = useContext(Context);

  const handleHome = () => {
    router.push("/All");
  }

  const handleJoin = () => {
    // Handle join action
  }

  const handleEvents = () => {
    router.push("/home/Events");
  }

  const handleLogout = async () => {
    try {
      // Remove the user id from AsyncStorage
      await AsyncStorage.removeItem('userId');

      // Clear the user context
      setuser({
        userid: null,
        username: '',
        useremail: '',
        userphonenumber: '',
      });

      router.push("/"); // You may want to navigate to the login screen or home screen
    } catch (error) {
      console.error('Logout error:', error);
      Alert.alert('Error', 'Failed to logout. Please try again.');
    }
  };

  return (
    <View>
      <Text>{user.username}</Text>
      <Text>{user.userid}</Text>
      <Text>{user.name}</Text>
      <Text>All</Text>
      <Button title='Home' onPress={handleHome} />
      <Button title='Join Telegram' onPress={handleJoin} />
      <Button title='Events' onPress={handleEvents} />
      <Button title='Logout' onPress={handleLogout} />
    </View>
  );
}

export default All;
