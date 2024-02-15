const User = require("./model/User");
const mongoose = require("mongoose");
require('dotenv').config();

console.log(process.env.MONGO_URI)

mongoose.connect(process.env.MONGO_URI)


async function run() {
  const user = User({name: "Julian", phon: "81828282", email:"julianallenderussek@gmail.com"});
  await user.save()
  mongoose.disconnect()
}

run()