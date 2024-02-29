// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { authenticateToken } = require("../middleware/auth")


const multer = require('multer');
const File = require('../model/File');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/'); // specify the directory where files will be saved
  },
  filename: function(req, file, cb) {
    const timestamp = Date.now(); // Get current timestamp
    const fileExtension = file.originalname.split('.').pop(); // Get file extension
    const uniqueFilename = `${timestamp}.${fileExtension}`;
    cb(null, uniqueFilename); // use the original file name
  }
});

const upload = multer({ storage: storage });

// Define routes
router.post('/', authenticateToken, upload.single('file'), async function(req,res) {

  const file = await File.create({
    filename: req.file.filename,
    original_name: req.file.originalname,
    url: req.file.destination + req.file.filename, 
    owner: req.user.id, 
    file_type: req.body['file_type']
  })

  file.save()

  return res.status(201).json({message: "File succesfully created", file})
});

// Add routes for update, delete, etc.

module.exports = router;