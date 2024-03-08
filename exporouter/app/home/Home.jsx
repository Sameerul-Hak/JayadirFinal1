import React, { useState } from 'react';
import { View, Text, ImageBackground, StyleSheet, Image } from 'react-native';
import eventimage from '../../assets/images/Event.jpeg';
import { SafeAreaView } from 'react-native-safe-area-context';
import popupimage from "../../assets/images/Event.jpeg"
import { router } from 'expo-router';
const Home = () => {
  const [visible, setvisible] = useState(true);

  return (
    <SafeAreaView style={{flex:1}}>
      {
        visible &&
        <View style={{flex:1,position:"absolute",width:"100%",height:"90%",alignSelf:"center",justifyContent:"center",top:"10%"}}>
            <Text style={{fontSize:30,backgroundColor:"red",width:"10%",textAlign:"center",borderRadius:10,alignSelf:"flex-end",margin:"1%"}} onPress={()=>{router.push("/home/All")}}>X</Text>
            <Image source={popupimage} style={{width:"100%",height:"90%",zIndex:9,alignSelf:"center"}}/>
        </View>
      }
      {/* <ImageBackground source={eventimage} style={styles.backgroundImage}>
      <View style={styles.container}>
      </View>
    </ImageBackground> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default Home;
