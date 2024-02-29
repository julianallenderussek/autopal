
const bcrypt = require('bcrypt');
const Appointment = require('../model/Appointment');
require('dotenv').config();

const createAppointment = async (req, res) => {
  try {
  
    const appointment = new Appointment({...req.body, buyer: req.user._id});
    await appointment.save();

    return res.status(201).json({message:"Appointment created", _id: appointment._id});
  } catch (err) {
    console.log(err.message)
    
    return res.status(400).json({ error: err.message });
  }
};

const getAppointment = async (req, res) => {
  try {
 
    if (!req.params._id) {
      return res.status(400).json({message:"Please provide a listing id"});    
    }

    const appointment = await Appointment.findById(req.params._id)
    .populate({
      path: 'buyer',
      select: '_id first_name last_name phone email' // Specify the fields you want to populate
    })
    .populate({
      path: 'seller',
      select: '_id first_name last_name phone email'
    })
    .populate({
      path: 'listing',
      // select: '_id first_name last_name phone email'
    })
    .exec();
    
    return res.status(201).json({appointment});
  } catch (err) {
    console.log(err.message)
    
    return res.status(400).json({ error: err.message });
  }
};

const updateAppointment = async (req, res) => {
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


const deleteAppointment = async (req, res) => {
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
  createAppointment,
  getAppointment,
  updateAppointment,
  deleteAppointment
}
