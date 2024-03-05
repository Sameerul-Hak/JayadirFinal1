// app.js
const express = require("express");
const app = express();
const cors = require('cors');


app.use(cors());
app.use(express.json());

app.use("/user", require("./Routes/user"));
app.use("/events", require("./Routes/event"));
app.use("/contact", require("./Routes/ContactRoute"));
app.use("/attendance", require("./Routes/AttendanceRoute"));
app.use("/admin",require("./Routes/AdminRoutes"));

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});

// module.exports = sequelize;
