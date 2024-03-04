import { View, Text, StyleSheet, Button } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Camera, useCameraDevice, useCodeScanner } from 'react-native-vision-camera';
import { router, useLocalSearchParams } from 'expo-router';
import axios from 'axios';
import url from '../../config';

const CameraPage = ({ route }) => {
  const [scannedCodes, setScannedCodes] = useState([]);
  const [isCameraActive, setCameraActive] = useState(true);
  const device = useCameraDevice('back');
  const [eventid, setEventId] = useState("");
  const local = useLocalSearchParams();

 
  const handleAttendance = async () => {
    if (eventid !== "") {
      try {
        // Assuming you have the necessary API endpoint to mark attendance
        await axios.post(`${url}/attendance/checkAttendance/${eventid}`);
        // Marking attendance was successful, navigate to the home page
        router.push("/home");
      } catch (error) {
        console.error('Error marking attendance:', error);
      }
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
    <View style={styles.cont}>
      <Camera
        style={styles.camera}
        device={device}
        isActive={isCameraActive}
        codeScanner={codeScanner}
      />
      <View style={styles.text}>
        <Text>{local.eventid}</Text>
        {/* <Button title="Mark Attendance" onPress={handleAttendance} /> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cont: {
    flex: 1,
  },
  camera: {
    flex: 0.6,
  },
  text: {
    flex: 0.4,
  }
});

export default CameraPage;
