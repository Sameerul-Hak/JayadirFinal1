import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { router } from 'expo-router';
import axios from 'axios';
import url from '../config';
import { Context } from '../Context';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Index = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const { user, setuser } = useContext(Context);

  useEffect(() => {
    const checkLoggedIn = async () => {
      const userId = await AsyncStorage.getItem('userId');

      if (userId) {
        router.push('/home');
      }
    };

    checkLoggedIn();
  }, []); // Empty dependency array ensures this effect runs only once on component mount

  const handleLogin = async () => {
    // Validate phone number and password
    if (!phoneNumber || !password) {
      Alert.alert('Error', 'Please enter both phone number and password');
      return;
    }

    try {
      // Send login request to your backend
      const response = await axios.post(`${url}/user/login`, {
        phoneNumber: phoneNumber,
        password: password,
      });

      // Assuming your backend returns a success message
      if (response.status === 200) {
        await AsyncStorage.setItem('userId', response.data.userId.toString());
        await AsyncStorage.setItem('username', response.data.name);

        setuser({
          userid: response.data.userId,
          username: response.data.name,
          useremail: "",
          userphonenumber: response.data.phoneNumber,
        });

        console.log(response.data.userId, response.data.name, response.data.phoneNumber);
        router.push('/home');
      } else {
        // Handle invalid credentials
        Alert.alert('Error', 'Invalid credentials. Please try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      // Handle other errors, e.g., network issues, server errors, etc.
      Alert.alert('Error', 'An unexpected error occurred. Please try again later.');
    }
  };

  return (
    <SafeAreaView>
      <Text>Index</Text>
      <TextInput
        placeholder="Phone Number"
        keyboardType="phone-pad"
        onChangeText={(text) => setPhoneNumber(text)}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
      />
      <Button title="Login" onPress={handleLogin} />
      <Text onPress={() => router.push('/Register')}>Register</Text>
    </SafeAreaView>
  );
};

export default Index;
