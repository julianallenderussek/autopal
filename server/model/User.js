const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: String,
  phone: String,
  role: String,
  password: String
})

module.exports = mongoose.model("User", userSchema)
module.exports = mongoose.model("User", userSchema)