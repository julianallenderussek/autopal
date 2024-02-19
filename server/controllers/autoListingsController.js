
const bcrypt = require('bcrypt');
const User = require('../model/User');
require('dotenv').config();

const createAutoListing = async (req, res) => {
  try {
    
    return res.status(201).json({message:"Auto Listing"});
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

module.exports = {
  createAutoListing
}
