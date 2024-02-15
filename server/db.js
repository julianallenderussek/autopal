require('dotenv').config();
const mongoose = require('mongoose');

// Get MongoDB URI from environment variable
const mongoURI = process.env.DB_URI;

mongoose.connect(mongoURI)


// Define mongoose schema and models here

// Start your server or do other setup here
