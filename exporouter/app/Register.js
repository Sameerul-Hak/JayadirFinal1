import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet, Modal, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';
import url from '../config';
import axios from 'axios';
const Register = () => {
  const [fullName, setFullName] = useState('');
  const [icNumber, setIcNumber] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const [date, setDate] = useState('');

  const [Class, setClass] = useState('');
  const [Race, setRace] = useState('');
  const [Fathername, setFatherName] = useState('');
  const [fatherage, setFatherAge] = useState('');
  const [fatheroccupation, setFatherOccupation] = useState('');
  const [fatherstatus, setFatherStatus] = useState('');
  const [mothername, setMotherName] = useState('');
  const [motherage, setMotherAge] = useState('');
  const [motheroccupation, setMotherOccupation] = useState('');
  const [motherstatus, setMotherStatus] = useState('');
  const [homeaddress, setHomeAddress] = useState('');
  const [state, setState] = useState('');
  const [district, setDistrict] = useState('');
  const [phonenumber, setPhoneNumber] = useState('');
  const [phonenumberfather, setPhoneNumberFather] = useState('');
  const [phonenumbermother, setPhoneNumberMother] = useState('');
  const [picture, setPicture] = useState('');
  const [whoami, setWhoAmI] = useState('');
  const [selectedState, setSelectedState] = useState('');

  const [selectedSchoolState, setSelectedSchoolState] = useState('');
  const [selectedSchoolDistrict, setSelectedSchoolDistrict] = useState('');
  const [password,setpassword]=useState("")
  const states = ['SELANGOR', 'Kuala Lumpur'];
  const schoolStates = ['SELANGOR', 'Kuala Lumpur'];
  const selangorDistricts = [
    'Sabak Bernam',
    'Hulu Selangor',
    'Kuala Selangor',
    'Gombak',
    'Petaling Jaya',
    'Klang',
    'Hulu Langat',
    'Sepang',
    'Kuala Langat',
  ];

  const kualaLumpurDistricts = [
    'Kepong',
    'Batu',
    'Wangsa Maju',
    'Setiawangsa',
    'Titiwangsa',
    'Segambut',
    'Bukit Bintang',
    'Lembah Pantai',
    'Cheras',
    'Bandar Tun Razak',
    'Seputih',
  ];
  const selangorSchoolDistricts = [
    'Sabak Bernam',
    'Hulu Selangor',
    'Kuala Selangor',
    'Gombak',
    'Petaling Jaya',
    'Klang',
    'Hulu Langat',
    'Sepang',
    'Kuala Langat',
  ];

  const kualaLumpurSchoolDistricts = [
    'Kepong',
    'Batu',
    'Wangsa Maju',
    'Setiawangsa',
    'Titiwangsa',
    'Segambut',
    'Bukit Bintang',
    'Lembah Pantai',
    'Cheras',
    'Bandar Tun Razak',
    'Seputih',
  ];

  const districts = selectedState === 'SELANGOR' ? selangorDistricts : kualaLumpurDistricts;
  const schoolDistricts =
  selectedSchoolState === 'SELANGOR'
    ? selangorSchoolDistricts
    : kualaLumpurSchoolDistricts;
  
  // const [picture,setPicture] = useState("")
    const [modal,setModal] = useState(false)

    
    const submitData = async () => {
      if (
        !fullName ||
        !icNumber ||
        !dateOfBirth ||
        !schoolName ||
        !date ||
        !Class ||
        !Race ||
        !Fathername ||
        !fatherage ||
        !fatheroccupation ||
        !fatherstatus ||
        !mothername ||
        !motherage ||
        !motheroccupation ||
        !motherstatus ||
        !homeaddress ||
        !state ||
        !district ||
        !phonenumber ||
        !phonenumberfather ||
        !phonenumbermother ||
        !whoami ||
        !selectedSchoolState ||
        !selectedSchoolDistrict ||
        !password
      ) {
        Alert.alert('Error', 'All fields are mandatory');
        return;
      }
  
      // Validate IC number format using regular expression
      const icNumberRegex = /^\d{6}-\d{2}-\d{4}$/;
      if (!icNumber.match(icNumberRegex)) {
        Alert.alert('Error', 'Invalid IC number format. Use: 650423-07-5659');
        return;
      }
  
      try {
        const response = await axios.post(`${url}/user/register`, {
          fullName,
          icNumber,
          dateOfBirth,
          schoolName,
          date,
          Class,
          Race,
          Fathername,
          fatherage,
          fatheroccupation,
          fatherstatus,
          mothername,
          motherage,
          motheroccupation,
          motherstatus,
          homeaddress,
          state,
          district,
          phonenumber,
          phonenumberfather,
          phonenumbermother,
          picture,
          whoami,
          selectedSchoolState,
          selectedSchoolDistrict,
          password, // Add password to the data being sent
        });
  
        if (response.data != null) {
          console.log(response.data);

        }
      } catch (error) {
        console.error(error);
        Alert.alert('Error', 'Failed to register. Please try again.');
      }
    };

const pickFromGalleryWithPermissions = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  
    if (status === "granted") {
      try {
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 0.5,
        });
  
        if (!result.canceled) {
          const image = result.assets[0]; // Access image from "assets" array
  
          const newFile = {
            uri: image.uri,
            type: `test/${image.uri.split(".").pop()}`, // Use `pop()` instead of indexing
            name: `test.${image.uri.split(".").pop()}`,
          };
  
          handleUpload(newFile);
          setModal(false);
        }
      } catch (error) {
        console.error(error.message); // handle error
      }
    } else {
      Alert.alert("Permission denied for accessing the gallery");
    }
  };
  const pickFromCameraWithPermissions = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
  
    if (status === "granted") {
      try {
        const result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 0.5,
        });
        if (!result.canceled) {
            const image = result.assets[0]; // Access image from "assets" array
    
            const newFile = {
              uri: image.uri,
              type: `test/${image.uri.split(".").pop()}`, // Use `pop()` instead of indexing
              name: `test.${image.uri.split(".").pop()}`,
            };
    
            handleUpload(newFile);
            setModal(false);
          }
        } catch (error) {
          console.error(error.message); // handle error
        }
    } else {
      Alert.alert("Permission denied for accessing the camera");
    }
  };
     const handleUpload = (image)=>{
          const data = new FormData()
          data.append('file',image)
          data.append('upload_preset','complaint')
          data.append("cloud_name","daqnlvhjm")
  
          fetch("https://api.cloudinary.com/v1_1/daqnlvhjm/image/upload",{
              method:"post",
              body:data
          }).then(res=>res.json()).
          then(data=>{
              setPicture(data.url)
              alert("images loaded uploaded")
              setModal(false)
          }).catch(err=>{
              Alert.alert("error while uploading")
          })
     }
  return (
    <ScrollView>
      <Text>Register</Text>
      <Text>Full Name:</Text>
      <TextInput
        placeholder="Full Name"
        value={fullName}
        onChangeText={(text) => setFullName(text)}
        />
      <Text>Password :</Text>
      <TextInput
        placeholder="Full Name"
        value={password}
        onChangeText={(text) => setpassword(text)}
        />
        <Text>IC Number</Text>
      <TextInput
        placeholder="650423-07-5659"
        value={icNumber}
        onChangeText={(text) => setIcNumber(text)}
        keyboardType="numeric"
        />
        <Text>Date of Birth:</Text>
      <TextInput
        placeholder="Date of Birth"
        value={dateOfBirth}
        onChangeText={(text) => setDateOfBirth(text)}
        keyboardType="numeric" // You might want to use a date picker component
        />
        <Text>School Name</Text>
      <TextInput
        placeholder="School Name"
        value={schoolName}
        onChangeText={(text) => setSchoolName(text)}
        />
        <Text>SchooL State:</Text>
      <Picker
        selectedValue={selectedSchoolState}
        onValueChange={(itemValue) => {
          setSelectedSchoolState(itemValue);
          setSelectedSchoolDistrict('');
        }}
        >
        <Picker.Item label="Select School State" value="" />
        {schoolStates.map((state) => (
          <Picker.Item key={state} label={state} value={state} />
        ))}
      </Picker>
      {selectedSchoolState && (
        <Picker
        selectedValue={selectedSchoolDistrict}
        onValueChange={(itemValue) => setSelectedSchoolDistrict(itemValue)}
        >
          <Picker.Item label="Select School District" value="" />
          {schoolDistricts.map((district) => (
            <Picker.Item key={district} label={district} value={district} />
            ))}
        </Picker>
      )}
      <Text>Class :</Text>
      <Picker
        selectedValue={Class}
        onValueChange={(itemValue) => setClass(itemValue)}
        style={{ backgroundColor: 'white', zIndex: 9999, elevation: 1000, }}
        
        >
        <Picker.Item label="Select Class Type" value=""  style={{color:"black",fontSize:15}} />
        <Picker.Item label="3" value="3" style={{color:"black",fontSize:15}} />
        <Picker.Item label="4" value="4" style={{color:"black",fontSize:15}} />
        <Picker.Item label="5" value="5" style={{color:"black",fontSize:15}} />
        <Picker.Item label="STPM" value="STPM" style={{color:"black",fontSize:15}} />
        <Picker.Item label="Others" value="Others" style={{color:"black",fontSize:15}} />
      </Picker>
      <Text>Race :</Text>
      <Picker
        selectedValue={Race}
        onValueChange={(itemValue) => setRace(itemValue)}
        style={{ backgroundColor: 'white', zIndex: 9999, elevation: 1000, }}
      >
        <Picker.Item label="Select Race Type" value=""  style={{color:"black",fontSize:15}} />
        <Picker.Item label="Malay" value="Malay" style={{color:"black",fontSize:15}} />
        <Picker.Item label="Chinese" value="Chinese" style={{color:"black",fontSize:15}} />
        <Picker.Item label="Indian" value="Indian" style={{color:"black",fontSize:15}} />
        <Picker.Item label="Others" value="Others" style={{color:"black",fontSize:15}} />
      </Picker>
      
        <Text>Father Name:</Text>
      <TextInput
        placeholder="Father's Name"
        value={Fathername}
        onChangeText={(text) => setFatherName(text)}
      />
        <Text>Father Age:</Text>
      <TextInput
        placeholder="Father's Age"
        value={fatherage}
        onChangeText={(text) => setFatherAge(text)}
        keyboardType="numeric"
        />
        <Text>Father Occupation:</Text>
      <TextInput
        placeholder="Father's Occupation"
        value={fatheroccupation}
        onChangeText={(text) => setFatherOccupation(text)}
        />
        <Text>Father Status:</Text>
      <Picker
        selectedValue={fatherstatus}
        onValueChange={(itemValue) => setFatherStatus(itemValue)}
        style={{ backgroundColor: 'white', zIndex: 9999, elevation: 1000, }}
        >
        <Picker.Item label="Select Father Status Working ?" value=""  style={{color:"black",fontSize:15}} />
        <Picker.Item label="Yes-Working" value="Yes" style={{color:"black",fontSize:15}} />
        <Picker.Item label="Not Working" value="No" style={{color:"black",fontSize:15}} />
        <Picker.Item label="D - PassedAway" value="D" style={{color:"black",fontSize:15}} />
      </Picker>
      
        <Text>Mother Name:</Text>
      <TextInput
        placeholder="Mother's Name"
        value={mothername}
        onChangeText={(text) => setMotherName(text)}
        />
        <Text>Mother Age:</Text>
      <TextInput
        placeholder="Mother's Age"
        value={motherage}
        onChangeText={(text) => setMotherAge(text)}
        keyboardType="numeric"
        />
        <Text>Mother Occupation :</Text>
      <TextInput
        placeholder="Mother's Occupation"
        value={motheroccupation}
        onChangeText={(text) => setMotherOccupation(text)}
        />
        <Text>Mother Status :</Text>
       <Picker
        selectedValue={motherstatus}
        onValueChange={(itemValue) => setMotherStatus(itemValue)}
        style={{ backgroundColor: 'white', zIndex: 9999, elevation: 1000, }}
        >
        <Picker.Item label="Select Mother Status Working ?" value=""  style={{color:"black",fontSize:15}} />
        <Picker.Item label="Yes-Working" value="Yes" style={{color:"black",fontSize:15}} />
        <Picker.Item label="Not Working" value="No" style={{color:"black",fontSize:15}} />
        <Picker.Item label="D - PassedAway" value="D" style={{color:"black",fontSize:15}} />
      </Picker>
        <Text>Home Address :</Text>
      <TextInput
        placeholder="Home Address"
        value={homeaddress}
        onChangeText={(text) => setHomeAddress(text)}
        />
        <Text>Your State :</Text>
      <Picker
        selectedValue={state}
        onValueChange={(itemValue) => setState(itemValue)}
        >
        <Picker.Item label="Select State" value="" />
        {states.map((state) => (
          <Picker.Item key={state} label={state} value={state} />
          ))}
      </Picker>
      {state && (
        <Picker
          selectedValue={district}
          onValueChange={(itemValue) => setDistrict(itemValue)}
        >
          <Picker.Item label="Select District" value="" />
          {districts.map((district) => (
            <Picker.Item key={district} label={district} value={district} />
          ))}
        </Picker>
      )}
      <Text>Personal Phone Number</Text>
      <TextInput
        placeholder="Phone Number"
        value={phonenumber}
        onChangeText={(text) => setPhoneNumber(text)}
        keyboardType="numeric"
        />
        <Text>Father's Phone Number</Text>
      <TextInput
        placeholder="Father's Phone Number"
        value={phonenumberfather}
        onChangeText={(text) => setPhoneNumberFather(text)}
        keyboardType="numeric"
        />
        <Text>Mother's Phone Number</Text>
      <TextInput
        placeholder="Mother's Phone Number"
        value={phonenumbermother}
        onChangeText={(text) => setPhoneNumberMother(text)}
        keyboardType="numeric"
      />
      <Text>Select your role</Text>
       <Picker
        selectedValue={whoami}
        onValueChange={(itemValue) => setWhoAmI(itemValue)}
        style={{ backgroundColor: 'white', zIndex: 9999, elevation: 1000, }}
        >
        <Picker.Item label="Who are you ?" value=""  style={{color:"black",fontSize:15}} />
        <Picker.Item label="Student" value="Student" style={{color:"black",fontSize:15}} />
        <Picker.Item label="Teachers " value="Teachers " style={{color:"black",fontSize:15}} />
        <Picker.Item label="Expo participants" value="ExpoParticipants" style={{color:"black",fontSize:15}} />
      </Picker>

        <Text>Upload the SPM result:</Text>

      <Button 
             style={styles.btn}
              title="Upload Image"
              onPress={() => setModal(true)}>
                    
             </Button>
             
             <Button 
              title="Upload"
              onPress={() => submitData()}>   
             </Button>
             
     
             
             <Modal
             animationType="slide"
             transparent={true}
             visible={modal}
             onRequestClose={()=>{
                 setModal(false)
             }}
             >
              <View style={styles.modalView}>
                  <View style={styles.modalButtonView}>
                        <Button 
                        title='camera'
                         onPress={() =>pickFromCameraWithPermissions()}>
                                
                        </Button>
                        <Button 
                         title=' gallery'
                          onPress={() => pickFromGalleryWithPermissions()}>
                               
                        </Button>
                  </View>
                <Button 
                 title='cancel'
                onPress={() => setModal(false)}>
                        
                </Button>
              </View>
             </Modal>


      <Button title="Submit" onPress={submitData} />
    </ScrollView>
  );
};
 const styles=StyleSheet.create({
  modalView:{
    position:"absolute",
    bottom:2,
    width:"100%",
    backgroundColor:"white"

},
modalButtonView:{
    flexDirection:"row",
    justifyContent:"space-around",
    padding:10
},btn:{
    backgroundColor:"blue"
},
 });
export default Register;
