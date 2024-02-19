// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { createAutoListing } = require('../controllers/autoListingsController');
const { authenticateToken } = require("../middleware/auth")

// Define routes
router.post('/', authenticateToken, createAutoListing);

// Add routes for update, delete, etc.

module.exports = router;