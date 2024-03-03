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
	status: {
		type: String,
		enum: ["draft", "published", "closed"],
		default: 'draft'
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
	main_image: {
    type: String,
    default: "",
  },
	owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
		required: true
  }
},
	{
		timestamps: true
	}
)

module.exports = mongoose.model("AutoListing", AutoListingSchema)
