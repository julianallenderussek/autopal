const mongoose = require("mongoose");

const AutoSpecSchema = new mongoose.Schema({
  title: String,
  description: String,
  image_url: String	
}, 
{
  timestamps: true
}
)

module.exports = mongoose.model("Appointment", AutoSpecSchema)
