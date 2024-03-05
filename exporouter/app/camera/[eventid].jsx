import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import { Camera, useCameraDevice, useCodeScanner } from 'react-native-vision-camera';
import { router, useLocalSearchParams } from 'expo-router';
import axios from 'axios';
import url from '../../config';
import { Context } from '../../Context';
import { SafeAreaView } from 'react-native-safe-area-context';

const CameraPage = ({ route }) => {
    const { user,setuser } = useContext(Context);


  const [scannedCodes, setScannedCodes] = useState([]);
  const [isCameraActive, setCameraActive] = useState(true);
  const device = useCameraDevice('back');
  const [ScannedEventId, setEventId] = useState("");
  const { eventid } = useLocalSearchParams();

  useEffect(() => {
    if (eventid !== "") {
      setEventId(eventid);
    }
  }, [eventid]);

  const handleAttendance = async () => {
    if (ScannedEventId === "") {
      Alert.alert('Error', 'Please scan a valid code.');
      return;
    }
  
    if (ScannedEventId !== eventid) {
      Alert.alert('Error', 'You have chosen the wrong event.');
      return;
    }
  
    try {
      const userId = user.userid
  
      // Sending a POST request to create attendance
      const response = await axios.post(`${url}/attendance/createattendance`, {
        eventId: ScannedEventId, // Assuming ScannedEventId contains the eventId
        userId: userId,
      });
  
      if (response.status === 201) {
        alert("Attendance marked successfully");
        router.push("/home");
      } else {
        console.error('Failed to mark attendance:', response.data.message);
        Alert.alert('Error', 'Failed to mark attendance. Please try again.');
      }
    } catch (error) {
      console.error('Error marking attendance:', error);
      Alert.alert('Error', 'Failed to mark attendance. Please try again.');
    }
  };
  
  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: (codes) => {
      console.log(`Scanned ${codes.length} codes!`);
      let value = codes[0]?.value;
      console.log(codes[0]?.value);
      setEventId(value);
      setCameraActive(false);
    },
  });

  return (
    <SafeAreaView style={styles.cont}>
      <Camera
        style={styles.camera}
        device={device}
        isActive={isCameraActive}
        codeScanner={codeScanner}
      />
      <View style={styles.text}>
        <Text>{ScannedEventId}</Text>
        <Button title="Mark Attendance" onPress={handleAttendance} />
      </View>
      <Text>{user.username}</Text>
      <Text>{user.userid}</Text>
      <Text>{user.name}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  cont: {
    // flex: 1,
  },
  camera: {
    // flex: 0.1,
    // height:100,
  },
  text: {
    // flex: 0.4,
    alignSelf: "center",
  }
});

export default CameraPage;
