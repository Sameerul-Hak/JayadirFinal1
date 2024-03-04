import { View, Text, StyleSheet } from 'react-native'
import React,{ useState }  from 'react'
import { Camera, useCameraDevice, useCodeScanner } from 'react-native-vision-camera';
import { router } from 'expo-router';

const CameraPage = () => {
  const [scannedCodes, setScannedCodes] = useState([]);
  const [isCameraActive, setCameraActive] = useState(true);
  const device = useCameraDevice('back');
  const [data,setdata]=useState("")
  if (device == null) return <NoCameraErrorView />;

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: (codes) => {
      console.log(`Scanned ${codes.length} codes!`);
      let value = codes[0]?.value;
      console.log(codes[0]?.value);
      setdata(value)      
      setCameraActive(false);
      if(data!="")
      {
        alert("attendance marked")
        router.push("/home")
      }
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
        <Text>{data}</Text>
      </View>
    </View>
  );
}

const styles=StyleSheet.create({
  cont:{
    flex:1,
  },
  camera:{
    flex:0.6,
  },
  text:{
    flex:0.4,
  }
})
export default CameraPage