const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema({
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
		required: true
  },
	seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
		required: true
  },
  listing: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AutoListing',
		required: true
  },
  status: {
    type: String,
    enum: ["pending", "confirmed", "canceled", "closed"],
    default: "pending"
  },
  fromDateTime: Date,
  toDateTime: Date	
}, 
{
  timestamps: true
}
)

module.exports = mongoose.model("Appointment", AppointmentSchema)
