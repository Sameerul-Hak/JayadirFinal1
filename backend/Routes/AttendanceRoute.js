const express=require("express");
const { route } = require("./user");
const { allattendance, createAttendance, checkattendance, updateattendance, deleteAttendance } = require("../Controller/AttendanceController");
const router=express.Router();

router.get("/allattendance",allattendance)
router.post("/postattendance",createAttendance)
router.get("/checkAttendance/:eventId/:userId",checkattendance)
router.delete("/attendance/:attendanceId",deleteAttendance)




module.exports=router;