const  Attendance  = require('../Model/AttendanceModel');

exports.allAttendance = async (req, res) => {
  try {
    const attendanceRecords = await Attendance.findAll();
    res.status(200).json(attendanceRecords);
  } catch (error) {
    console.error(`Error fetching attendance records: ${error}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


exports.createAttendance = async (req, res) => {
  const { eventId, userId } = req.body;

  const existingAttendance = await Attendance.findOne({
    where: { eventId, userId },
  });

  if (existingAttendance) {
    return res.status(200).json({ message: "Attendance already marked" });
  }

  try {
    const createdAttendance = await Attendance.create({ eventId, userId });
    res.status(201).json({ message: "Attendance record created successfully", attendanceId: createdAttendance.attendanceId });
  } catch (error) {
    console.error(`Error creating attendance record: ${error}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};



exports.updateAttendance = async (req, res) => {
  const attendanceId = req.params.attendanceId;
  const updatedData = req.body;

  try {
    await Attendance.update(updatedData, {
      where: {
        attendanceId: attendanceId,
      },
    });

    res.status(200).json({ message: "Attendance record updated successfully" });
  } catch (error) {
    console.error(`Error updating attendance record: ${error}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.deleteAttendance = async (req, res) => {
  const attendanceId = req.params.attendanceId;

  try {
    await Attendance.destroy({
      where: {
        attendanceId: attendanceId,
      },
    });

    res.status(200).json({ message: "Attendance record deleted successfully" });
  } catch (error) {
    console.error(`Error deleting attendance record: ${error}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
