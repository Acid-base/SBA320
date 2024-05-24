const express = require('express');
const router = express.Router();

// Example Data (Replace with your MongoDB query later)
const mushroomsData = [
  // ... your mushroom data (get this from your MongoDB query later)
];
router.get('/', (req, res) => {
  const searchTerm = req.query.q; // Get the search term from the query parameter

  if (!searchTerm) {
    return res.json(mushroomsData); // Return all mushrooms if no search term
  }

  // Implement search logic here (similar to frontend, but query MongoDB)
  // ...

  // Example: Filtering data based on searchTerm (replace with MongoDB query)
  const filteredMushrooms = mushroomsData.filter(mushroom => 
    mushroom.commonName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  res.json(filteredMushrooms);
});

module.exports = router; 
