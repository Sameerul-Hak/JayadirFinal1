// app.js
const express = require("express");
const app = express();
const cors = require('cors');
// const  Sequelize  = require('sequelize');

app.use(cors());
app.use(express.json());

// const sequelize = new Sequelize(
//   "brd5rohp616w73oh8mb3",
//   "uy9zv2alcimdtouo",
//   "zCGGge3XtE3heDr9Srr0"
//   ,
//   {
//   host: "brd5rohp616w73oh8mb3-mysql.services.clever-cloud.com",
//   // user: "uy9zv2alcimdtouo",
//   // password: "zCGGge3XtE3heDr9Srr0",
//   // database: "brd5rohp616w73oh8mb3",
//   dialect: 'mysql',
//   logging:false
// });

// // Test the connection
// sequelize.authenticate()
//   .then(() => {
//     console.log('Database connected');
//   })
//   .catch((err) => {
//     console.error('Error connecting to the database:', err);
//   });


// sequelize.sync({ force: false }) // Set force to true to drop and recreate tables on every restart (use with caution)
//   .then(() => {
//     console.log('Tables synced');
//   })
//   .catch((err) => {
//     console.error('Error syncing tables:', err);
//   });

// Use routes (assuming you have them defined in separate files)

app.use("/user", require("./Routes/user"));
app.use("/events", require("./Routes/event"));
app.use("/contact", require("./Routes/ContactRoute"));
app.use("/attendance", require("./Routes/AttendanceRoute"));

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});

// module.exports = sequelize;
