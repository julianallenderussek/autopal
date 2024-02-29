const mongoose = require("mongoose");

const FileSchema = new mongoose.Schema({
  filename: String,
  original_name: String,
  url: String,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
		required: true
  },
  file_type: String
}, 
{
  timestamps: true
}
)

module.exports = mongoose.model("File", FileSchema)
