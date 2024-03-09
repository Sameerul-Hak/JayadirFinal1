import React, { useState } from 'react';
import "./Register.css"; // You can add your custom styles here
import { useParams } from 'react-router-dom';
import axios from 'axios';
import url from '../../Config';

function Teacher() {
  const [fullName, setFullName] = useState('');
  const [icNumber, setIcNumber] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const [phonenumber, setContactNumber] = useState('');

  const [state, setstate] = useState('');
  const [district, setDistrict] = useState('');
  const {eventname}=useParams();
  const schoolStates = ['SELANGOR', 'Kuala Lumpur'];
  const [password, setPassword] = useState('');

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

  const handleSchoolStateChange = (state) => {
    setstate(state);
    // Update districts based on the selected school state
    if (state === 'SELANGOR') {
      setDistrict(selangorDistricts[0]); // Set default district for Selangor
    } else if (state === 'Kuala Lumpur') {
      setDistrict(kualaLumpurDistricts[0]); // Set default district for Kuala Lumpur
    }
  };

  const handleSchoolDistrictChange = (district) => {
    setDistrict(district);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Define all possible fields
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
  
      // Create an object with all fields set to null
      const nullFormData = Object.fromEntries(allFields.map((field) => [field, null]));
  
      // Update the nullFormData with the provided data
      const formData = {
        ...nullFormData,
        fullName,
        icNumber,
        schoolName,
        phonenumber,
        state,
        district,
        whoami:"teacher",
        password
      };
  
      console.log(formData);
  
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
    } catch (err) {
      // Handle errors
      console.error(err);
    }
  };
  

  return (
    <div>
      <h1>{eventname}</h1>
      <form onSubmit={handleFormSubmit}>
        {/* Teacher Information */}
        <label>
          Full Name:
          <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} />
        </label>
  
        <label>
          IC Number:
          <input type="text" value={icNumber} onChange={(e) => setIcNumber(e.target.value)} />
        </label>
  
        <label>
          Name of School:
          <input type="text" value={schoolName} onChange={(e) => setSchoolName(e.target.value)} />
        </label>
        <label>
          Contact number:
          <input type="text" value={phonenumber} onChange={(e) => setContactNumber(e.target.value)} />
        </label>
  
        {/* State Dropdown */}
        <label>
          School State:
          <select value={state} onChange={(e) => handleSchoolStateChange(e.target.value)}>
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
            value={district}
            onChange={(e) => handleSchoolDistrictChange(e.target.value)}
          >
            <option value="">Select School District</option>
            {state === 'SELANGOR'
              ? selangorDistricts.map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))
              : state === 'Kuala Lumpur'
              ? kualaLumpurDistricts.map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))
              : null}
          </select>
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Teacher;
