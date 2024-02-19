const mongoose = require("mongoose");

const AutoPostSchema = new mongoose.Schema({
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

module.exports = mongoose.model("AutoPost", AutoPostSchema)
