// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { 
  createAppointment, updateAppointment, 
  getAppointment, getUserAppointments

} = require('../controllers/appointmentController');
const { authenticateToken } = require("../middleware/auth")

// Define routes
router.get('/user', authenticateToken, getUserAppointments);
router.put('/:_id', authenticateToken, updateAppointment);
router.get('/id/:_id', authenticateToken, getAppointment);
router.post('/', authenticateToken, createAppointment);

// router.put('/:_id', authenticateToken, updateAppcreateAppointment);
// router.delete('/:_id', authenticateToken, deleteAppcreateAppointment);


// Add routes for update, delete, etc.

module.exports = router;