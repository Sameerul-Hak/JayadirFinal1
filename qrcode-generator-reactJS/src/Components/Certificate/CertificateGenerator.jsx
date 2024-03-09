import React, { useEffect, useState } from 'react'
import jsPDF from 'jspdf'
import img from '../../assets/template-1.png'
import { useParams } from "react-router-dom"
import axios from 'axios';
import url from '../../Config';

const generateCertificate = (name) => {


  // const[visble,setvisible]=useState(false);
  // useEffect(()=>{
  //   const changevisible=async()=>{

  //     try {
  //       const response=await axios.get()
  //     } catch (error) {
        
  //     }

  //   }
  // },[])
  // Create a new jsPDF instance
  const doc = new jsPDF();
  
  
  // Add background image
  doc.addImage(img, 'PNG', 0, 0, doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight());

  // Add recipient name
  doc.setFontSize(36);
  doc.setFont('helvetica'); // Change the font family and style
  doc.text(name, 105, 119, { align: 'center' }); // 105 and 160: horizontal and vertical positions of the text

  // // Add course name
  // doc.setFontSize(20);
  // doc.text(course, 105, 195, { align: 'center' }); // 105 and 195: horizontal and vertical positions of the text

  // Save the PDF
  doc.save(`${name}.pdf`);
};

function CertificateGenerator() {
  const { name,eventid } = useParams();
  const [isvisble,setvisbile]=useState(false);
  useEffect(()=>{
    const decide=async()=>{
      try{
        const response=await axios.get(`${url}/candistribute/${eventid}`);
        console.log(response.data.candistributeValue);
        if(response.data.candistributeValue==="ON")
        {
          setvisbile(true);
        }
        else{
          setvisbile(false)
        }
      }
      catch(err)
      {
        console.log(err);
      }
    }
    decide();
  },[])
    return (
      <div>
        <h1>{name},{eventid}</h1>
        {
          isvisble &&
          <button onClick={() => generateCertificate(name)}>Generate Certificate</button>
        }
      </div>
    );
  }

export default CertificateGenerator