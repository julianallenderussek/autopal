const mongoose = require("mongoose");

const AutoSpecToAutoListingSchema = new mongoose.Schema({
  auto_listing: { type: mongoose.Schema.Types.ObjectId, ref: 'AutoListing' },
  auto_spec: { type: mongoose.Schema.Types.ObjectId, ref: 'AutoSpec' }
}, 
{
  timestamps: true
}
)

module.exports = mongoose.model("AutoSpecToAutoListing", AutoSpecToAutoListingSchema)
