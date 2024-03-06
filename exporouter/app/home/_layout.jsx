import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons';

const _layout = () => {
  return (
    <Tabs screenOptions={
      ({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          
        if (route.name === 'All') {
          iconName = 'list'; 
        }
        else if (route.name === 'Home') {
          iconName = 'home'; 
        }
        else if (route.name === 'Events') {
          iconName = 'calendar'; 
        }
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      
    },{headerShown:false})
    
  }
  //  ={{
  //     activeTintColor: 'blue',
  //     inactiveTintColor: 'gray',
  //   }}
>
      <Tabs.Screen name='All' />
      <Tabs.Screen name='Home' />
      <Tabs.Screen name='Events' />
    </Tabs>
  )
}

export default _layout