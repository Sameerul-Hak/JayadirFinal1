import { View, Text, Button } from 'react-native'
import React, { useContext } from 'react'
import { router } from 'expo-router'
import { Context } from '../../Context';

const All = () => {
  const { user,setuser } = useContext(Context);



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
      <Text>{user.username}</Text>
      <Text>{user.userid}</Text>
      <Text>{user.name}</Text>
      <Text>All</Text>
      <Button title='Home'/>
      <Button title='Join Telegram'/>
      <Button title='Events' onPress={handleEvents}/>
    </View>
  )
}

export default All