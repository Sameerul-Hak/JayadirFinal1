import React, { useState } from 'react';
import "./Register.css"; // You can add your custom styles here
import url from '../../Config';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "./Teacherform.css"
function Others() {
  const [fullName, setFullName] = useState('');
  const [icNumber, setIcNumber] = useState('');
  const [Occupation, setOccupation] = useState('');
  const [ParentOrVisitor, setParentOrVisitor] = useState('');
  const [phonenumber, setContactNumber] = useState('');
  const [Email, setEmail] = useState(''); 
  const [state, setstate] = useState('');
  const [district, setDistrict] = useState('');
  const {eventname}=useParams();
  const [password, setPassword] = useState('');

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

  const handlestatechange = (state) => {
    setstate(state);
    // Update districts based on the selected school state
    if (state === 'SELANGOR') {
      setDistrict(selangorDistricts[0]); // Set default district for Selangor
    } else if (state === 'Kuala Lumpur') {
      setDistrict(kualaLumpurDistricts[0]); // Set default district for Kuala Lumpur
    }
  };

  const handledistrictchange = (district) => {
    setDistrict(district);
  };

  const handleFormSubmit = async(e) => {
    e.preventDefault();
    
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
        'Occupation',
        'Email'
      ];
  
      // Create an object with all fields set to null
      const nullFormData = Object.fromEntries(allFields.map((field) => [field, null]));
      const icNumberRegex = /^\d{6}-\d{2}-\d{4}$/;
      if (!icNumber.match(icNumberRegex)) {
        alert('Invalid IC number format. Use: 650423-07-5659');
        return;
      }
      // Update the nullFormData with the provided data
      const formData = {
        ...nullFormData,
        fullName,
        icNumber,
        phonenumber,
        state,
        district,
        whoami:"others",
        Occupation,
        ParentOrVisitor,
        password,
        Email

      };
      // console.log(formData);
      const response = await axios.post(`${url}/post/${eventname}`, formData);
  
      // Handle the response from the server if needed
      // console.log(response.data);
      if(response.status==201)
      {
        alert("Thank you for Registering ! \n Please note down your phoneNumber and password for getting Certificate")
      }
      else{
        
        alert("Some Error Occured")
      }
    } catch (error) {
      alert(error.response.data.error);

    }
  };

  return (
    <div className='container_form'>
          <h1 className="h1">{eventname}</h1>

    <form className="form-container" onSubmit={handleFormSubmit}>
      {/* Others Information */}
      <label className="label">
        Full Name:
        <input className="input-field" type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} required placeholder='Enter your name' />
      </label>

      <label className="label">
        IC Number:
        <input className="input-field" type="text" value={icNumber} onChange={(e) => setIcNumber(e.target.value)}  required placeholder='XXXXXX-XX-XXXX'/>
      </label>

      {/* State Dropdown */}
      <label className="label">
        School State:
        <select className="select-field" value={state} onChange={(e) => handlestatechange(e.target.value)} required >
          <option value="">Select School State</option>
          {schoolStates.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
      </label>

      {/* School District Dropdown */}
      <label className="label">
        School District:
        <select
          className="select-field"
          value={district}
          onChange={(e) => handledistrictchange(e.target.value)}
          required
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

      <label className="label">
        Occupation:
        <input className="input-field" type="text" value={Occupation} onChange={(e) => setOccupation(e.target.value)} required  placeholder='Enter your Occupation'/>
      </label>

      <label className="label">
        Parent or Visitor:
        <select className="select-field" value={ParentOrVisitor} onChange={(e) => setParentOrVisitor(e.target.value)}  required>
          <option value="">Select Option</option>
          <option value="Parent">Parent</option>
          <option value="Visitor">Visitor</option>
        </select>
      </label>

      <label className="label">
        Contact Number:
        <input className="input-field" type="text" value={phonenumber} onChange={(e) => setContactNumber(e.target.value)} required placeholder='Enter your Contact Number'/>
      </label>
      <label className="label">
          Email:
          <input className="input-field" type="text" value={Email} onChange={(e) => setEmail(e.target.value)}  required placeholder='Enter your Email'/>
        </label>
      <label className="label">
        Password:
        <input className="input-field" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required  placeholder='Enter your password'/>
      </label>
      <button className="button" type="submit">Submit</button>
    </form>
  </div>
  );
}

export default Others;
