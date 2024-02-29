// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { 
  createAppointment, getAppointment, updateAppointment, deleteAppointment 
} = require('../controllers/appointmentController');
const { authenticateToken } = require("../middleware/auth")

// Define routes
router.post('/', authenticateToken, createAppointment);
router.get('/:_id', authenticateToken, getAppointment);
// router.put('/:_id', authenticateToken, updateAppcreateAppointment);
// router.delete('/:_id', authenticateToken, deleteAppcreateAppointment);


// Add routes for update, delete, etc.

module.exports = router;