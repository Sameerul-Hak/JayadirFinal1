const express=require("express");
const { allevent, createevent } = require("../Controller/eventController");
const router=express.Router();

router.get("/allevents",allevent);
router.post("/createevent",createevent);




module.exports=router