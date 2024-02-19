const mongoose = require("mongoose");

const AutoListingSchema = new mongoose.Schema({
  make: String,
	model: Number,
	year: Number,
	city: String,
	state: String,
	country: String,
	price: Number,
	milage: Number,
	main_image: String,
	user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

module.exports = mongoose.model("AutoListing", AutoListingSchema)
