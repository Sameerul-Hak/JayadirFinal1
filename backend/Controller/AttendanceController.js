const db = require("../app");

exports.allattendance=(req, res) => {
    const query = "SELECT * FROM attendance";
    
    db.query(query, (err, result) => {
      if (err) {
        console.error(`Error fetching attendance records: ${err}`);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        res.status(200).json(result);
      }
    });
  };

  exports.createAttendance=(req, res) => {
    const attendanceData = req.body;
    const query = "INSERT INTO attendance SET ?";
    
    db.query(query, attendanceData, (err, result) => {
      if (err) {
        console.error(`Error creating attendance record: ${err}`);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        res.status(201).json({ message: "Attendance record created successfully", attendanceId: result.insertId });
      }
    });
  };

  exports.checkattendance=(req, res) => {
    const eventId = req.params.eventId;
    const userId = req.params.userId;
    const query = "SELECT * FROM attendance WHERE eventId = ? AND userId = ?";
    
    db.query(query, [eventId, userId], (err, result) => {
      if (err) {
        console.error(`Error checking attendance: ${err}`);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        if (result.length > 0) {
          res.status(200).json({ isAttendanceMarked: true });
        } else {
          res.status(200).json({ isAttendanceMarked: false });
        }
      }
    });
  };
  exports.updateattendance=(req, res) => {
    const attendanceId = req.params.attendanceId;
    const updatedData = req.body;
    const query = "UPDATE attendance SET ? WHERE attendanceId = ?";
    
    db.query(query, [updatedData, attendanceId], (err, result) => {
      if (err) {
        console.error(`Error updating attendance record: ${err}`);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        res.status(200).json({ message: "Attendance record updated successfully" });
      }
    });
  };

  exports.deleteAttendance=(req, res) => {
    const attendanceId = req.params.attendanceId;
    const query = "DELETE FROM attendance WHERE attendanceId = ?";
    
    db.query(query, attendanceId, (err, result) => {
      if (err) {
        console.error(`Error deleting attendance record: ${err}`);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        res.status(200).json({ message: "Attendance record deleted successfully" });
      }
    });
  };