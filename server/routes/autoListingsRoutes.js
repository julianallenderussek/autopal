// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { 
  createAutoListing, getAutoListing, updateAutoListing, deleteAutoListing, getAutoListings, myAutoListings 
} = require('../controllers/autoListingsController');
const { authenticateToken } = require("../middleware/auth")

// Define routes
router.post('/', authenticateToken, createAutoListing);
router.get('/user/my_listings', authenticateToken, myAutoListings);
router.get('/', getAutoListings);
router.get('/:_id', authenticateToken, getAutoListing);
router.put('/:_id', authenticateToken, updateAutoListing);
router.delete('/:_id', authenticateToken, deleteAutoListing);


// Add routes for update, delete, etc.

module.exports = router;