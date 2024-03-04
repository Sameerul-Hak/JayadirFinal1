import { View, Text, Button } from 'react-native'
import React from 'react'
import { router } from 'expo-router'

const All = () => {
  const handleHome=()=>{
    router.push("/All")
  }
  const handleJoin=()=>{
    // router.push("/")
  }
  const handleEvents=()=>{
    router.push("/home/Events")
  }
  return (
    <View>
      <Text>All</Text>
      <Button title='Home'/>
      <Button title='Join Telegram'/>
      <Button title='Events' onPress={handleEvents}/>
    </View>
  )
}

export default All