
const bcrypt = require('bcrypt');
const AutoListing = require('../model/AutoListing');
require('dotenv').config();

const createAutoListing = async (req, res) => {
  try {

    console.log("AUTH USER", req.user)
  
    const autoListing = new AutoListing({...req.body});
    await autoListing.save();
    
    return res.status(201).json({message:"Auto Listing created", _id: autoListing._id});
  } catch (err) {
    console.log(err.message)
    
    return res.status(400).json({ error: err.message });
  }
};

const getAutoListing = async (req, res) => {
  try {
 
    if (!req.params._id) {
      return res.status(400).json({message:"Please provide a listing id"});    
    }

    const autoListing = await AutoListing.findById(req.params._id);
    
    return res.status(201).json({autoListing});
  } catch (err) {
    console.log(err.message)
    
    return res.status(400).json({ error: err.message });
  }
};

const updateAutoListing = async (req, res) => {
  try {
     
    if (!req.params._id) {
      return res.status(400).json({message:"Please provide a listing id"});    
    }

    await AutoListing.findByIdAndUpdate(req.params._id, {...req.body});
    
    return res.status(201).json({message: "Record successfully updated", _id: _id });
  } catch (err) {
    console.log(err.message)
    
    return res.status(400).json({ error: err.message });
  }
};


const deleteAutoListing = async (req, res) => {
  try {
     
    if (!req.params._id) {
      return res.status(400).json({message:"Please provide a listing id"});    
    }

    await AutoListing.findByIdAndDelete(req.params._id);
    
    return res.status(201).json({message: "Record succesfully deleted"});
  } catch (err) {
    console.log(err.message)
    
    return res.status(400).json({ error: err.message });
  }
};

module.exports = {
  createAutoListing,
  getAutoListing,
  updateAutoListing,
  deleteAutoListing
}
