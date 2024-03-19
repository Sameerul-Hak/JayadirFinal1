import React, { useEffect, useState } from 'react';
import jsPDF from 'jspdf';
import img from '../../assets/StuTea.png';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';
import url from '../../Config';
import './certificateGen.css'; // Import the CSS file

const capitalizeFirstLetter = (name) => {
  return name.charAt(0).toUpperCase() + name.slice(1);
};
const generateCertificate = (name, ic) => {
  const doc = new jsPDF();

  // Add background image
  doc.addImage(img, 'PNG', 0, 0, doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight());

  // Add recipient name with capitalized first letter
  const capitalizedFirstName = capitalizeFirstLetter(name);
  doc.setFontSize(34);
  doc.setFont('helvetica');
  doc.text(`${capitalizedFirstName} \n ${ic}`, 125, 99, { align: 'center' });

  // Save the PDF
  doc.save(`${capitalizedFirstName}.pdf`);
  localStorage.removeItem('userToken');
  localStorage.removeItem('userId');
  localStorage.removeItem('eventId');
};

function CertificateGenerator() {
  const { name, eventid } = useParams();
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate(); // Use useNavigate hook
  const{ic}=useParams();
  useEffect(() => {
    const decide = async () => {
      try {
        const response = await axios.get(`${url}/candistribute/${eventid}`);
        setIsVisible(response.data.candistributeValue === 'ON');
      } catch (err) {
        console.log(err);
      }
    };
    decide();
  }, []);

  // Check if the necessary data is present in local storage
  useEffect(() => {
    const userToken = localStorage.getItem('userToken');
    const userId = localStorage.getItem('userId');
    const eventId = localStorage.getItem('eventId');
    console.log(userId);
    if (!userToken || !userId || !eventId) {
      // Use navigate to redirect to the login page
      navigate('/certificateLoging');
    }
  }, [navigate]);

  return (
    <div className="certificate-container">
      <h1 className="certificate-heading">Hey {name}!</h1>
      <p className="certificate-message">You can download your certificate by clicking the button below:</p>
      <div className="button-container">
        {isVisible && (
          <button className="generate-button" onClick={() => generateCertificate(name,ic)}>
            Generate Certificate
          </button>
        )}
        {!isVisible && <h2 className="wait-message">OOPS! Please wait until the event ends.</h2>}
      </div>
    </div>
  );
}

export default CertificateGenerator;
