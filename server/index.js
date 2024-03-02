const express = require('express');
const app = express();
require('dotenv').config();
const userRoutes = require("./routes/usersRoutes");
const autoListingsRoutes = require("./routes/autoListingsRoutes");
const appointmentsRoutes = require("./routes/appointmentsRoutes");
const filesRoutes = require("./routes/filesRoutes");
const bodyParser = require('body-parser');
const cors = require('cors')
const PORT = process.env.PORT;
const morgan = require("morgan")

app.use(bodyParser.json())
app.use(cors())
app.use(morgan('tiny'))

app.get('/', (req, res) => {
  return res.status(200).json("Hello World")
})

app.use('/users', userRoutes);
app.use('/auto_listings', autoListingsRoutes);
app.use('/appointments', appointmentsRoutes);
app.use('/files', filesRoutes)


module.exports = app;