// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { createUser } = require('../controllers/usersController');

// Define routes
router.post('/', createUser);

// Add routes for update, delete, etc.

module.exports = router;