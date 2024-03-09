import React, { useState } from 'react'
import "./Register.css"
import url from '../../Config';
import axios from 'axios';
import { useParams } from 'react-router-dom';
function Student() {
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
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedSchoolState, setSelectedSchoolState] = useState('');
  const [selectedSchoolDistrict, setSelectedSchoolDistrict] = useState('');
  const [password, setPassword] = useState('');
  const {eventname}=useParams();

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


  const handleSchoolStateChange = (selectedSchoolState) => {
    setSelectedSchoolState(selectedSchoolState);
    // Update districts based on the selected school state
    if (selectedSchoolState === 'SELANGOR') {
      setSelectedSchoolDistrict(selangorDistricts[0]); // Set default district for Selangor
    } else if (selectedSchoolState === 'Kuala Lumpur') {
      setSelectedSchoolDistrict(kualaLumpurDistricts[0]); // Set default district for Kuala Lumpur
    }
  };

  const handleSchoolDistrictChange = (selectedSchoolDistrict) => {
    setSelectedSchoolDistrict(selectedSchoolDistrict);
  };

  const handleStateChange = (selectedState) => {
    setSelectedState(selectedState);
    if (selectedState === 'SELANGOR') {
      setSelectedDistrict(selangorDistricts[0]); // Set default district for Selangor
    } else if (selectedState === 'Kuala Lumpur') {
      setSelectedDistrict(kualaLumpurDistricts[0]); // Set default district for Kuala Lumpur
    }
  };

  const handleDistrictChange = (selectedDistrict) => {
    setSelectedDistrict(selectedDistrict);
  };

  const handleFormSubmit = async(e) => {
    // Add logic to send the form data to the server or perform any other actions
    try {
      const allFields = [
        'fullName',
        'icNumber',
        'dateOfBirth',
        'schoolName',
        'date',
        'Class',
        'Race',
        'Fathername',
        'fatherage',
        'fatheroccupation',
        'fatherstatus',
        'mothername',
        'motherage',
        'motheroccupation',
        'motherstatus',
        'homeaddress',
        'state',
        'district',
        'phonenumber',
        'phonenumberfather',
        'phonenumbermother',
        'picture',
        'whoami',
        'selectedSchoolState',
        'selectedSchoolDistrict',
        'password',
        'ParentOrVisitor',
        'Occupation'
      ];
      const nullFormData = Object.fromEntries(allFields.map((field) => [field, null]));
  
      e.preventDefault();
      // Handle form submission logic here
      const formData = {
        ...nullFormData,
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
        state: selectedState,
        district: selectedDistrict,
        phonenumber,
        phonenumberfather,
        phonenumbermother,
        picture,
        whoami:"student",
        selectedSchoolState,
        selectedSchoolDistrict,
        password,
        
      };
      console.log(formData);
      // let arrayofname=
      const response = await axios.post(`${url}/post/${eventname}`, formData);
  
      // Handle the response from the server if needed
      console.log(response.data);
      if(response.status==201)
      {
        alert("Thank you for Registering ! you may leave the site now")
      }
      else{
        
        alert("Some Error Occured")
      }
    } catch (error) {
      
    }
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        {/* Personal Information */}
        <label>
          Full Name:
          <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} />
        </label>
  
        <label>
          IC Number:
          <input type="text" value={icNumber} onChange={(e) => setIcNumber(e.target.value)} />
        </label>
  
        <label>
          Date of Birth:
          <input type="date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />
        </label>
  
        <label>
          School Name:
          <input type="text" value={schoolName} onChange={(e) => setSchoolName(e.target.value)} />
        </label>


        <label>
          Admission Date:
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </label>
  
        {/* Other Information */}
        <label>
          Class:
          <input type="text" value={Class} onChange={(e) => setClass(e.target.value)} />
        </label>
  
        <label>
          Race:
          <input type="text" value={Race} onChange={(e) => setRace(e.target.value)} />
        </label>
  
        <label>
          Father's Name:
          <input type="text" value={Fathername} onChange={(e) => setFatherName(e.target.value)} />
        </label>
  
        <label>
          Father's Age:
          <input type="text" value={fatherage} onChange={(e) => setFatherAge(e.target.value)} />
        </label>
  
        <label>
          Father's Occupation:
          <input type="text" value={fatheroccupation} onChange={(e) => setFatherOccupation(e.target.value)} />
        </label>
  
        <label>
          Father's Status:
          <input type="text" value={fatherstatus} onChange={(e) => setFatherStatus(e.target.value)} />
        </label>
  
        <label>
          Mother's Name:
          <input type="text" value={mothername} onChange={(e) => setMotherName(e.target.value)} />
        </label>
  
        <label>
          Mother's Age:
          <input type="text" value={motherage} onChange={(e) => setMotherAge(e.target.value)} />
        </label>
  
        <label>
          Mother's Occupation:
          <input type="text" value={motheroccupation} onChange={(e) => setMotherOccupation(e.target.value)} />
        </label>
  
        <label>
          Mother's Status:
          <input type="text" value={motherstatus} onChange={(e) => setMotherStatus(e.target.value)} />
        </label>
  
        <label>
          Home Address:
          <input type="text" value={homeaddress} onChange={(e) => setHomeAddress(e.target.value)} />
        </label>
  
       
        <label>
          Phone Number:
          <input type="text" value={phonenumber} onChange={(e) => setPhoneNumber(e.target.value)} />
        </label>
  
        <label>
          Father's Phone Number:
          <input type="text" value={phonenumberfather} onChange={(e) => setPhoneNumberFather(e.target.value)} />
        </label>
  
        <label>
          Mother's Phone Number:
          <input type="text" value={phonenumbermother} onChange={(e) => setPhoneNumberMother(e.target.value)} />
        </label>
  
        <label>
          Picture:
          <input type="text" value={picture} onChange={(e) => setPicture(e.target.value)} />
        </label>
  
        
  
        <label>
          Selected State:
          <input type="text" value={selectedState} onChange={(e) => setSelectedState(e.target.value)} />
        </label>
    
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>

        <label>
          School State:
          <select value={selectedSchoolState} onChange={(e) => handleSchoolStateChange(e.target.value)}>
            <option value="">Select School State</option>
            {schoolStates.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </label>

        {/* School District Dropdown */}
        <label>
          School District:
          <select
            value={selectedSchoolDistrict}
            onChange={(e) => handleSchoolDistrictChange(e.target.value)}
          >
            <option value="">Select School District</option>
            {selectedSchoolState === 'SELANGOR'
              ? selangorDistricts.map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))
              : selectedSchoolState === 'Kuala Lumpur'
              ? kualaLumpurDistricts.map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))
              : null}
          </select>
        </label>

        {/* State Dropdown */}
        <label>
          State:
          <select value={selectedState} onChange={(e) => handleStateChange(e.target.value)}>
            <option value="">Select State</option>
            {schoolStates.map((state1) => (
              <option key={state1} value={state1}>
                {state1}
              </option>
            ))}
          </select>
        </label>

        {/* District Dropdown */}
        <label>
          District:
          <select value={selectedDistrict} onChange={(e) => handleDistrictChange(e.target.value)}>
          <option value="">Select School District</option>
            {selectedState === 'SELANGOR'
              ? selangorDistricts.map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))
              : selectedState === 'Kuala Lumpur'
              ? kualaLumpurDistricts.map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))
              : null}
          </select>
        </label>
  
        <button type="submit">Submit</button>
      </form>
    </div>
  );
  
}

export default Student
