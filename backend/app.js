// app.js
const express = require("express");
const app = express();
const cors = require('cors');
const sequelize = require("./config/db.js");

app.use(cors());
app.use(express.json());

app.use("/user", require("./Routes/user"));
app.use("/events", require("./Routes/event"));
app.use("/contact", require("./Routes/ContactRoute"));
app.use("/attendance", require("./Routes/AttendanceRoute"));
app.use("/admin", require("./Routes/AdminRoutes"));

app.get("/:eventname", async (req, res) => {
  const { eventname } = req.params;
  const tableQuery = `
    CREATE TABLE IF NOT EXISTS ${eventname}Attendance (
      id INT AUTO_INCREMENT PRIMARY KEY,
      fullName VARCHAR(255) DEFAULT NULL,
      icNumber VARCHAR(255) DEFAULT NULL,
      dateOfBirth VARCHAR(255) DEFAULT NULL,
      schoolName VARCHAR(255) DEFAULT NULL,
      date VARCHAR(255) DEFAULT NULL,
      Class VARCHAR(255) DEFAULT NULL,
      Race VARCHAR(255) DEFAULT NULL,
      Fathername VARCHAR(255) DEFAULT NULL,
      fatherage VARCHAR(255) DEFAULT NULL,
      fatheroccupation VARCHAR(255) DEFAULT NULL,
      fatherstatus VARCHAR(255) DEFAULT NULL,
      mothername VARCHAR(255) DEFAULT NULL,
      motherage VARCHAR(255) DEFAULT NULL,
      motheroccupation VARCHAR(255) DEFAULT NULL,
      motherstatus VARCHAR(255) DEFAULT NULL,
      homeaddress VARCHAR(255) DEFAULT NULL,
      state VARCHAR(255) DEFAULT NULL,
      district VARCHAR(255) DEFAULT NULL,
      phonenumber VARCHAR(255) DEFAULT NULL,
      phonenumberfather VARCHAR(255) DEFAULT NULL,
      phonenumbermother VARCHAR(255) DEFAULT NULL,
      picture VARCHAR(255) DEFAULT NULL,
      whoami VARCHAR(255) DEFAULT NULL,
      selectedSchoolState VARCHAR(255) DEFAULT NULL,
      selectedSchoolDistrict VARCHAR(255) DEFAULT NULL,
      password VARCHAR(255) DEFAULT NULL  
    );
  `;

  try {
    await sequelize.query(tableQuery);
    res.status(200).json({ message: `Table ${eventname}Attendance created successfully` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


app.post("/:register", async (req, res) => {
  try {
    const { register } = req.params;
    const { fullName, icNumber, dateOfBirth, schoolName, date, Class, Race, Fathername, fatherage, fatheroccupation, fatherstatus, mothername, motherage, motheroccupation, motherstatus, homeaddress, state, district, phonenumber, phonenumberfather, phonenumbermother, picture, whoami, selectedSchoolState, selectedSchoolDistrict, password } = req.body;

    // Create table if not exists
    const tableQuery = `
      CREATE TABLE IF NOT EXISTS ${register}Attendance (
        id INT AUTO_INCREMENT PRIMARY KEY,
        fullName VARCHAR(255) DEFAULT NULL,
        icNumber VARCHAR(255) DEFAULT NULL,
        dateOfBirth VARCHAR(255) DEFAULT NULL,
        schoolName VARCHAR(255) DEFAULT NULL,
        date VARCHAR(255) DEFAULT NULL,
        Class VARCHAR(255) DEFAULT NULL,
        Race VARCHAR(255) DEFAULT NULL,
        Fathername VARCHAR(255) DEFAULT NULL,
        fatherage VARCHAR(255) DEFAULT NULL,
        fatheroccupation VARCHAR(255) DEFAULT NULL,
        fatherstatus VARCHAR(255) DEFAULT NULL,
        mothername VARCHAR(255) DEFAULT NULL,
        motherage VARCHAR(255) DEFAULT NULL,
        motheroccupation VARCHAR(255) DEFAULT NULL,
        motherstatus VARCHAR(255) DEFAULT NULL,
        homeaddress VARCHAR(255) DEFAULT NULL,
        state VARCHAR(255) DEFAULT NULL,
        district VARCHAR(255) DEFAULT NULL,
        phonenumber VARCHAR(255) DEFAULT NULL,
        phonenumberfather VARCHAR(255) DEFAULT NULL,
        phonenumbermother VARCHAR(255) DEFAULT NULL,
        picture VARCHAR(255) DEFAULT NULL,
        whoami VARCHAR(255) DEFAULT NULL,
        selectedSchoolState VARCHAR(255) DEFAULT NULL,
        selectedSchoolDistrict VARCHAR(255) DEFAULT NULL,
        password VARCHAR(255) DEFAULT NULL
      );
    `;

    await sequelize.query(tableQuery);

    // Insert data into the table
    const insertQuery = `
      INSERT INTO ${register}Attendance (fullName, icNumber, dateOfBirth, schoolName, date, Class, Race, Fathername, fatherage, fatheroccupation, fatherstatus, mothername, motherage, motheroccupation, motherstatus, homeaddress, state, district, phonenumber, phonenumberfather, phonenumbermother, picture, whoami, selectedSchoolState, selectedSchoolDistrict, password)
      VALUES (:fullName, :icNumber, :dateOfBirth, :schoolName, :date, :Class, :Race, :Fathername, :fatherage, :fatheroccupation, :fatherstatus, :mothername, :motherage, :motheroccupation, :motherstatus, :homeaddress, :state, :district, :phonenumber, :phonenumberfather, :phonenumbermother, :picture, :whoami, :selectedSchoolState, :selectedSchoolDistrict, :password);
    `;

    await sequelize.query(insertQuery, {
      replacements: {
        fullName, icNumber, dateOfBirth, schoolName, date, Class, Race, Fathername, fatherage, fatheroccupation, fatherstatus, mothername, motherage, motheroccupation, motherstatus, homeaddress, state, district, phonenumber, phonenumberfather, phonenumbermother, picture, whoami, selectedSchoolState, selectedSchoolDistrict, password
      }
    });

    res.status(201).json({ message: "Data inserted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


app.listen(5000, () => {
  console.log("Server is running on port 5000");
});

// module.exports = sequelize;
