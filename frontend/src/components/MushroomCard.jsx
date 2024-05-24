// MushroomCard.jsx - A React component to display a single mushroom
import React, { useState } from 'react';
import './MushroomCard.css'; // Import CSS for styling the hover effect

function MushroomCard({ mushroom }) {
  const [showDetails, setShowDetails] = useState(false);
  return (
    <li 
      className="mushroom-card" // Add a class for styling
      onMouseEnter={() => setShowDetails(true)}
      onMouseLeave={() => setShowDetails(false)}
    >
      <img src={mushroom.imageUrl} alt={mushroom.commonName} />
      <h3>{mushroom.commonName}</h3>
      <p>{mushroom.scientificName}</p>

      {showDetails && ( // Conditionally render details
        <div className="details-card"> 
          {/* Add more details here as needed */}
          <p><strong>Edibility:</strong> {mushroom.edibility || 'Unknown'}</p>
          {/* ... other details */}
        </div>
      )}
    </li>
  );
}

export default MushroomCard;
