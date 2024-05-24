// server.js - This file starts your Node.js server and connects to the database

require('dotenv').config(); // Load environment variables from .env file

const express = require('express');
const mongoose = require('mongoose'); // MongoDB library for Node.js
const app = express();
const port = process.env.PORT || 3008; // Use the port from .env or default to 3008

// Import the router for your '/mushrooms' API endpoints
const mushroomsRouter = require('./routes/mushrooms'); 

// Connect to your MongoDB database (replace placeholders with your info)
mongoose.connect(process.env.MONGODB_URI, {
  // Add options for the connection if needed
})
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('Error connecting to MongoDB Atlas', err));

// Middleware
app.use(express.json()); // Parse JSON request bodies

// Define routes
app.use('/mushrooms', mushroomsRouter); // Use mushroomsRouter for routes starting with '/mushrooms'

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

