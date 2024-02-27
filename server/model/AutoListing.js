const mongoose = require("mongoose");

const AutoListingSchema = new mongoose.Schema({
  make: {
		type: String,
		required: true
	},
	model: {
		type: String,
		required: true
	},
	year: {
		type: Number,
		required: true
	},
	city: {
		type: String,
		required: true
	},
	state: {
		type: String,
		required: true
	},
	country: {
		type: String,
		required: true
	},
	price: {
		type: Number,
		required: true
	},
	milage: {
		type: Number,
		required: true
	},
	main_image: String,
	user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

module.exports = mongoose.model("AutoListing", AutoListingSchema)
