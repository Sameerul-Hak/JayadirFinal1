import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { router } from 'expo-router';
import axios from 'axios';
import url from '../config';

const Index = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');

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
      if (response.status == 200) {
        // Navigate to the home screen upon successful login
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
    <View>
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
    </View>
  );
};

export default Index;
