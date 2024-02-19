// controllers/userController.js

const User = require('../model/User');

const createUser = async (req, res) => {
  try {

    console.log("USER HERE",req.body)
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  createUser
}

// Implement other controller functions for update, delete, etc. as needed
