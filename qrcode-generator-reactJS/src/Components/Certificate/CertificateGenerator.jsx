import React, { useEffect, useState } from 'react';
import jsPDF from 'jspdf';
import img from '../../assets/template-1.png';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';
import url from '../../Config';
import './certificateGen.css'; // Import the CSS file

const generateCertificate = (name) => {
  const doc = new jsPDF();

  // Add background image
  doc.addImage(img, 'PNG', 0, 0, doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight());

  // Add recipient name
  doc.setFontSize(36);
  doc.setFont('helvetica');
  doc.text(name, 105, 119, { align: 'center' });

  // Save the PDF
  doc.save(`${name}.pdf`);
  localStorage.removeItem('userToken');
  localStorage.removeItem('userId');
  localStorage.removeItem('eventId');
};

function CertificateGenerator() {
  const { name, eventid } = useParams();
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate(); // Use useNavigate hook

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
          <button className="generate-button" onClick={() => generateCertificate(name)}>
            Generate Certificate
          </button>
        )}
        {!isVisible && <h2 className="wait-message">OOPS! Please wait until the event ends.</h2>}
      </div>
    </div>
  );
}

export default CertificateGenerator;
