const express = require('express');
const app = express();
require('dotenv').config();
const userRoutes = require("./routes/usersRoutes");
const autoListingsRoutes = require("./routes/autoListingsRoutes");


const bodyParser = require('body-parser');

const PORT = process.env.PORT;

app.use(bodyParser.json())

app.get('/', (req, res) => {
  return res.status(200).json("Hello World")
})

app.use('/users', userRoutes);
app.use('/auto_listings', autoListingsRoutes);


module.exports = app;