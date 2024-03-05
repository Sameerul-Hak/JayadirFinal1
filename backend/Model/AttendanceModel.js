const { DataTypes } = require('sequelize');
const db = require('../config/db');

const Attendance = db.define('Attendance', {
  attendanceId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  eventId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Attendance;
