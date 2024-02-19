// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { createUser, loginUser } = require('../controllers/usersController');

// Define routes
router.post('/', createUser);
router.post('/login', loginUser);

// Add routes for update, delete, etc.

module.exports = router;