import { View, Text, Button } from 'react-native'
import React from 'react'
import { router } from 'expo-router'

const Events = () => {
  const handleattendance=()=>{
    router.push("/camera/Camera");
  }
  return (
    <View>
        <View>
            <Text>Events 1</Text>
            <Button title='Attendance'  onPress={handleattendance}/>
        </View>
        <View>
            <Text>Events 2</Text>
            <Button title='Attendance'  onPress={handleattendance}/>
        </View>
    </View>
  )
}

export default Events