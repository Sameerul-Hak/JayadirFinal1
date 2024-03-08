import React, { useState } from 'react';
import "./Register.css"; // You can add your custom styles here

function Others() {
  const [fullName, setFullName] = useState('');
  const [icNumber, setIcNumber] = useState('');
  const [occupation, setOccupation] = useState('');
  const [parentOrVisitor, setParentOrVisitor] = useState('');
  const [contactNumber, setContactNumber] = useState('');

  const [state, setstate] = useState('');
  const [district, setDistrict] = useState('');

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

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = {
      fullName,
      icNumber,
      state,
      district,
      occupation,
      parentOrVisitor,
      contactNumber,
    };
    console.log(formData);
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        {/* Others Information */}
        <label>
          Full Name:
          <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} />
        </label>
  
        <label>
          IC Number:
          <input type="text" value={icNumber} onChange={(e) => setIcNumber(e.target.value)} />
        </label>
  
        {/* State Dropdown */}
        <label>
          School State:
          <select value={state} onChange={(e) => handlestatechange(e.target.value)}>
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
            onChange={(e) => handledistrictchange(e.target.value)}
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
          Occupation:
          <input type="text" value={occupation} onChange={(e) => setOccupation(e.target.value)} />
        </label>
  
        <label>
          Parent or Visitor:
          <select value={parentOrVisitor} onChange={(e) => setParentOrVisitor(e.target.value)}>
            <option value="">Select Option</option>
            <option value="Parent">Parent</option>
            <option value="Visitor">Visitor</option>
          </select>
        </label>
  
        <label>
          Contact Number:
          <input type="text" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} />
        </label>
  
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Others;
