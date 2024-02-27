const mongoose = require('mongoose');
const path = require('path');

require('dotenv').config({path: path.join(__dirname, '.env') });
// Get MongoDB URI from environment variable
const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI)

mongoose.connection.on('connected', err => {
  console.log("Connected to MongoDB")
});

module.exports = mongoose