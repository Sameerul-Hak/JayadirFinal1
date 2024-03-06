import React from 'react';
import { View, Text, ImageBackground, StyleSheet } from 'react-native';
import eventimage from '../../assets/images/Event.jpeg';
import { SafeAreaView } from 'react-native-safe-area-context';

const Home = () => {
  
  return (
    <SafeAreaView style={{flex:1}}>
      <ImageBackground source={eventimage} style={styles.backgroundImage}>
      <View style={styles.container}>
        {/* <Text style={styles.text}>Home</Text> */}
      </View>
    </ImageBackground>
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
