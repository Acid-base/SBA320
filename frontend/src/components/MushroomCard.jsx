// MushroomCard.jsx - A React component to display a single mushroom
import React from 'react';

function MushroomCard({ mushroom }) {
  // The 'mushroom' prop will contain data for a single mushroom
  return (
    <li>
      <img src={mushroom.imageUrl} alt={mushroom.commonName} /> 
      <h3>{mushroom.commonName}</h3>
      <p>{mushroom.scientificName}</p>
    </li>
  );
}

// Make this component available to other parts of your React app
export default MushroomCard;

