import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet, Modal, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';
import url from '../config';
import axios from 'axios';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Context } from '../Context';
import { SafeAreaView } from 'react-native-safe-area-context';

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
  const { user, setuser } = useContext(Context);

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
      console.log({
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
        password,
      });
      if (
        !fullName ||
        !icNumber ||
        !dateOfBirth ||
        !schoolName ||
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
          await AsyncStorage.setItem('userId', response.data.userId.toString());
        await AsyncStorage.setItem('username', response.data.name);

        setuser({
          userid: response.data.userId,
          username: response.data.name,
          useremail: '',
          userphonenumber: response.data.phoneNumber,
        });
          router.push("/home")

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
    <SafeAreaView style={{flex:1}}>
      <ScrollView style={styles.container}>
      <Text style={{alignSelf:"center",fontSize:20,fontWeight:"bold"}}>Register</Text>
      <Text style={styles.LabelText}>Full Name:</Text>
      <TextInput
        placeholder="Full Name"
        value={fullName}
        onChangeText={(text) => setFullName(text)}
        style={styles.InputBox}
        />
      <Text style={styles.LabelText}>Password :</Text>
      <TextInput
        placeholder="Full Name"
        value={password}
        onChangeText={(text) => setpassword(text)}
        style={styles.InputBox}
        />
        <Text style={styles.LabelText}>IC Number</Text>
      <TextInput
        placeholder="650423-07-5659"
        value={icNumber}
        onChangeText={(text) => setIcNumber(text)}
        style={styles.InputBox}
        keyboardType="numeric"
        />
        <Text style={styles.LabelText}>Date of Birth:</Text>
      <TextInput
        placeholder="Date of Birth"
        value={dateOfBirth}
        onChangeText={(text) => setDateOfBirth(text)}
        style={styles.InputBox}
        keyboardType="numeric" // You might want to use a date picker component
        />
        <Text style={styles.LabelText}>School Name</Text>
      <TextInput
        placeholder="School Name"
        value={schoolName}
        onChangeText={(text) => setSchoolName(text)}
        style={styles.InputBox}
        />
        <Text style={styles.LabelText}>SchooL State:</Text>
      <Picker
        selectedValue={selectedSchoolState}
        onValueChange={(itemValue) => {
          setSelectedSchoolState(itemValue);
          setSelectedSchoolDistrict('');
        }}
        >
        <Picker.Item label="Select School State" value="" style={{color:"black",fontSize:15,backgroundColor:"#f3f2f1"}}/>
        {schoolStates.map((state) => (
          <Picker.Item key={state} label={state} value={state} />
        ))}
      </Picker>
      {selectedSchoolState && (
        <Picker
        selectedValue={selectedSchoolDistrict}
        onValueChange={(itemValue) => setSelectedSchoolDistrict(itemValue)}
        >
          <Picker.Item label="Select School District" value="" style={{color:"black",fontSize:15,backgroundColor:"#f3f2f1"}}/>
          {schoolDistricts.map((district) => (
            <Picker.Item key={district} label={district} value={district} />
            ))}
        </Picker>
      )}
      <Text style={styles.LabelText}>Class :</Text>
      <Picker
        selectedValue={Class}
        onValueChange={(itemValue) => setClass(itemValue)}
        style={{ backgroundColor: 'white', zIndex: 9999, elevation: 1000, }}
        
        >
        <Picker.Item label="Select Class Type" value=""  style={{color:"black",fontSize:15,backgroundColor:"#f3f2f1"}}/>
        <Picker.Item label="3" value="3" style={{color:"black",fontSize:15}} />
        <Picker.Item label="4" value="4" style={{color:"black",fontSize:15}} />
        <Picker.Item label="5" value="5" style={{color:"black",fontSize:15}} />
        <Picker.Item label="STPM" value="STPM" style={{color:"black",fontSize:15}} />
        <Picker.Item label="Others" value="Others" style={{color:"black",fontSize:15}} />
      </Picker>
      <Text style={styles.LabelText}>Race :</Text>
      <Picker
        selectedValue={Race}
        onValueChange={(itemValue) => setRace(itemValue)}
        style={{ backgroundColor: 'white', zIndex: 9999, elevation: 1000, }}
      >
        <Picker.Item label="Select Race Type" value=""  style={{color:"black",fontSize:15,backgroundColor:"#f3f2f1"}} />
        <Picker.Item label="Malay" value="Malay" style={{color:"black",fontSize:15}} />
        <Picker.Item label="Chinese" value="Chinese" style={{color:"black",fontSize:15}} />
        <Picker.Item label="Indian" value="Indian" style={{color:"black",fontSize:15}} />
        <Picker.Item label="Others" value="Others" style={{color:"black",fontSize:15}} />
      </Picker>
      
        <Text style={styles.LabelText}>Father Name:</Text>
      <TextInput
        placeholder="Father's Name"
        value={Fathername}
        onChangeText={(text) => setFatherName(text)}
        style={styles.InputBox}
      />
        <Text style={styles.LabelText}>Father Age:</Text>
      <TextInput
        placeholder="Father's Age"
        value={fatherage}
        onChangeText={(text) => setFatherAge(text)}
        style={styles.InputBox}
        keyboardType="numeric"
        />
        <Text style={styles.LabelText}>Father Occupation:</Text>
      <TextInput
        placeholder="Father's Occupation"
        value={fatheroccupation}
        onChangeText={(text) => setFatherOccupation(text)}
        style={styles.InputBox}
        />
        <Text style={styles.LabelText}>Father Status:</Text>
      <Picker
        selectedValue={fatherstatus}
        onValueChange={(itemValue) => setFatherStatus(itemValue)}
        style={{ backgroundColor: 'white', zIndex: 9999, elevation: 1000, }}
        >
        <Picker.Item label="Select Father Status Working ?" value=""  style={{color:"black",fontSize:15,backgroundColor:"#f3f2f1"}} />
        <Picker.Item label="Yes-Working" value="Yes" style={{color:"black",fontSize:15}} />
        <Picker.Item label="Not Working" value="No" style={{color:"black",fontSize:15}} />
        <Picker.Item label="D - PassedAway" value="D" style={{color:"black",fontSize:15}} />
      </Picker>
      
        <Text style={styles.LabelText}>Mother Name:</Text>
      <TextInput
        placeholder="Mother's Name"
        value={mothername}
        onChangeText={(text) => setMotherName(text)}
        style={styles.InputBox}
        />
        <Text style={styles.LabelText}>Mother Age:</Text>
      <TextInput
        placeholder="Mother's Age"
        value={motherage}
        onChangeText={(text) => setMotherAge(text)}
        style={styles.InputBox}
        keyboardType="numeric"
        />
        <Text style={styles.LabelText}>Mother Occupation :</Text>
      <TextInput
        placeholder="Mother's Occupation"
        value={motheroccupation}
        onChangeText={(text) => setMotherOccupation(text)}
        style={styles.InputBox}
        />
        <Text style={styles.LabelText}>Mother Status :</Text>
       <Picker
        selectedValue={motherstatus}
        onValueChange={(itemValue) => setMotherStatus(itemValue)}
        style={{ backgroundColor: 'white', zIndex: 9999, elevation: 1000, }}
        >
        <Picker.Item label="Select Mother Status Working ?" value=""  style={{color:"black",fontSize:15,backgroundColor:"#f3f2f1"}} />
        <Picker.Item label="Yes-Working" value="Yes" style={{color:"black",fontSize:15}} />
        <Picker.Item label="Not Working" value="No" style={{color:"black",fontSize:15}} />
        <Picker.Item label="D - PassedAway" value="D" style={{color:"black",fontSize:15}} />
      </Picker>
        <Text style={styles.LabelText}>Home Address :</Text>
      <TextInput
        placeholder="Home Address"
        value={homeaddress}
        onChangeText={(text) => setHomeAddress(text)}
        style={styles.InputBox}
        />
        <Text style={styles.LabelText}>Your State :</Text>
      <Picker
        selectedValue={state}
        onValueChange={(itemValue) => setState(itemValue)}
        style={styles.InputBox}
        >
        <Picker.Item label="Select State" value="" style={{color:"black",fontSize:15,backgroundColor:"#f3f2f1"}}/>
        {states.map((state) => (
          <Picker.Item key={state} label={state} value={state} />
          ))}
      </Picker>
      {state && (
        <Picker
          selectedValue={district}
          onValueChange={(itemValue) => setDistrict(itemValue)}
        >
          <Picker.Item label="Select District" value="" style={{color:"black",fontSize:15,backgroundColor:"#f3f2f1"}}/>
          {districts.map((district) => (
            <Picker.Item key={district} label={district} value={district} />
          ))}
        </Picker>
      )}
      <Text style={styles.LabelText}>Personal Phone Number</Text>
      <TextInput
        placeholder="Phone Number"
        value={phonenumber}
        onChangeText={(text) => setPhoneNumber(text)}
        style={styles.InputBox}
        keyboardType="numeric"
        />
        <Text style={styles.LabelText}>Father's Phone Number</Text>
      <TextInput
        placeholder="Father's Phone Number"
        value={phonenumberfather}
        onChangeText={(text) => setPhoneNumberFather(text)}
        style={styles.InputBox}
        keyboardType="numeric"
        />
        <Text style={styles.LabelText}>Mother's Phone Number</Text>
      <TextInput
        placeholder="Mother's Phone Number"
        value={phonenumbermother}
        onChangeText={(text) => setPhoneNumberMother(text)}
        style={styles.InputBox}
        keyboardType="numeric"
      />
      <Text style={styles.LabelText}>Select your role</Text>
       <Picker
        selectedValue={whoami}
        onValueChange={(itemValue) => setWhoAmI(itemValue)}
        style={{ backgroundColor: 'white', zIndex: 9999, elevation: 1000, }}
        >
        <Picker.Item label="Who are you ?" value="" style={{color:"black",fontSize:15,backgroundColor:"#f3f2f1"}} />
        <Picker.Item label="Student" value="Student" style={{color:"black",fontSize:15}} />
        <Picker.Item label="Teachers " value="Teachers " style={{color:"black",fontSize:15}} />
        <Picker.Item label="Expo participants" value="ExpoParticipants" style={{color:"black",fontSize:15}} />
      </Picker>

        <Text style={styles.LabelText}>Upload the SPM result:</Text>

      <Button 
             style={styles.btn}
              title="Upload Image"
              onPress={() => setModal(true)}>
              style={{marginBottom:10}}
             </Button>
             
             {/* <Button 
              title="Upload"
              onPress={() => submitData()}>   
             </Button> */}
             
     
             
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

<Text onPress={submitData} style={styles.submit}>Submit</Text>
      {/* <Button title="Submit" onPress={submitData} style={styles.submit}/> */}
    </ScrollView>
    </SafeAreaView>
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
container: {
  flex: 1,
  padding: 20,
  backgroundColor: '#fff', // Set your desired background color
},
InputBox:{
borderWidth:0,
padding:10,
borderRadius:10,
marginBottom:10,
backgroundColor:"#f3f2f1",
},
LabelText:{
  fontSize:20,
  marginBottom:10
},
submit:{
  marginVertical:25,
  backgroundColor:"#94F67E",
  borderRadius:10,
  width:"40%",
  alignSelf:"center",
  textAlign:"center",
  padding:15,
  // padding:10
}
 });
export default Register;
