const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const schoolRoutes = require('./routes/schoolRoutes');

dotenv.config();
const app = express();
app.use(bodyParser.json());

// Routes
app.use("/api/schools", schoolRoutes); // Prefix routes with `/api`
// Start server
const PORT = process.env.PORT || 3000;
module.exports = app; 
