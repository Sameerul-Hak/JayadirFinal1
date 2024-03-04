import { View, Text } from 'react-native'
import React, { useContext,useState } from 'react'
import { Stack } from 'expo-router'
import { Context } from '../Context'

const _layout = () => {
    const [user,setuser]=useState({userid:"",username:"",useremail:"",userphonenumber:""})


  return (
    <Context.Provider value={{user,setuser}}>
    <Stack screenOptions={{headerShown:false}}/>
    </Context.Provider>
  )
}

export default _layout