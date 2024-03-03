
const bcrypt = require('bcrypt');
const Appointment = require('../model/Appointment');
require('dotenv').config();

const createAppointment = async (req, res) => {
  try {

    console.log("Create appointment", req.user , req.body)

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

    if (!req.body.status || !["pending", "confirmed", "canceled", "closed"].includes(req.body.status)) {
      return res.status(400).json({message:`Please a valid status ["pending", "accepted", "canceled", "closed"]`});    
    }

    const appointment = await Appointment.findById(req.params._id)
    
    appointment.status = req.body.status

    appointment.save()

    return res.status(201).json({message: "Appointment updated", _id: appointment._id, status: appointment.status });
  } catch (err) {
    console.log(err.message)
    
    return res.status(400).json({ error: err.message });
  }
};

const getUserAppointments = async(req, res) => {

  console.log(req.user)

  let appointments = []
  if (req.user.role === "buyer") {
    appointments = await Appointment.find({buyer: req.user._id}).populate({
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
  } else if (req.user.role === "seller") {
    appointments = await Appointment.find({seller: req.user._id}).populate({
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
  } else {
    return res.status(403).json({message: "Current user role invalid"})
  }
  

  return res.status(200).json({appointments: appointments})
} 


module.exports = {
  createAppointment,
  getAppointment,
  updateAppointment,
  getUserAppointments
}
