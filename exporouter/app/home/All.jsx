import React, { useContext, useEffect } from 'react';
import { View, Text, Button, Alert, StyleSheet, TouchableOpacity, Image, Linking } from 'react-native';
import { router } from 'expo-router';
import { Context } from '../../Context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import logop from "../../assets/images/logop.png"
const All = () => {
  const { user, setuser } = useContext(Context);


  
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem('userId');
        const usernameof = await AsyncStorage.getItem('username');
        if (storedUserId) {
          setuser({ userid: storedUserId,username:usernameof });
        }
      } catch (error) {
        console.error('Error fetching user ID from AsyncStorage:', error);
      }
    };

    fetchUserId();
  }, []);

  const handleHome = () => {
    router.push("/home/Home");
  }

  const handleJoin = () => {
    // Handle join action
    Linking.openURL(`https://t.me/+qtWoq3E091EwMmM1`);
  }

  const handleEvents = () => {
    router.push("/home/Events");
  }

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userId');
      setuser({
        userid: null,
        username: '',
        useremail: '',
        userphonenumber: '',
      });
      router.push("/");
    } catch (error) {
      console.error('Logout error:', error);
      Alert.alert('Error', 'Failed to logout. Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Hey {user.username} Welcome !</Text>
        <Image source={logop} style={{width:"25%",height:80}}/>
      </View>
      <View style={styles.secondContainer}>
          <TouchableOpacity style={styles.button} onPress={handleHome}>
            <Text style={styles.buttonText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleJoin}>
            <Text style={styles.buttonText}>Join Telegram</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleEvents}>
            <Text style={styles.buttonText}>Events</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 20,
    flex:0.1,
    backgroundColor:"linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,242,255,1) 0%, rgba(253,204,253,1) 58%, rgba(255,230,252,1) 100%)",
    width:"100%",
    flexDirection:"row",
    padding:8,
    borderRadius:10,
    justifyContent:"space-between"
  },
  secondContainer:{
    flex:0.9,
    backgroundColor:"linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,211,255,1) 43%, rgba(255,230,252,1) 100%) ",
    width:"100%",
    gap:30,

  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 18,
    color: '#888',
    marginBottom: 5,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  button: {
    backgroundColor: '#3498db',
    padding: 30,
    width: '100%',
    marginBottom: 15,
    borderRadius: 8,
  },
  logoutButton: {
    backgroundColor: '#e74c3c',
    padding: 15,
    width: '100%',
    marginBottom: 15,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default All;
