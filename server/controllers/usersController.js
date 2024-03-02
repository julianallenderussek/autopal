
const bcrypt = require('bcrypt');
const User = require('../model/User');
require('dotenv').config();
const jwt = require('jsonwebtoken');

const salt = 10;
const JWT_SECRET = process.env.JWT_SECRET;

const createUser = async (req, res) => {
  try {
    if (!req.body.email) {
      return res.status(400).json({ message: "Please provide an email" });
    }

    if (!req.body.password) {
      return res.status(400).json({ message: "Please provide a password" });
    }

    
    const hashPassword = await bcrypt.hash(req.body.password,salt);

    const user = new User({...req.body, password: hashPassword});
    await user.save();
    
    const tokenData = { 
      id: user._id,
      email:user.email,
      type: user.role
    }

    const token = await jwt.sign(tokenData,JWT_SECRET, { expiresIn: '2h'});  
    
    return res.status(201).json({message:"Login successfully", token: token, role: user.role});
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

const loginUser = async (req, res) => {
  try {
    
    const user = await User.findOne({email: req.body.email})

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const passwordComparison = await bcrypt.compare(req.body.password,user.password)
    
    if (!passwordComparison) {
      return res.status(400).json({ error: "Incorrect Password" });
    }

    const tokenData = { 
      _id: user._id,
      email:user.email,
      role: user.role
    }      

    const token = await jwt.sign(tokenData ,JWT_SECRET, { expiresIn: '2h'});  

    return res.status(200).json({token: token, _id: user._id, role: user.role});
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

module.exports = {
  createUser, loginUser
}

// Implement other controller functions for update, delete, etc. as needed
