const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: String,
  role: {
    type: String,
    enum: ["buyer", "seller"]
  },
  password: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model("User", userSchema)