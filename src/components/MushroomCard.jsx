import React from 'react';

function MushroomCard({ mushroom }) {
  return (
    <li>
      <img src={mushroom.imageUrl} alt={mushroom.commonName} /> 
      <h3>{mushroom.commonName}</h3>
      <p>{mushroom.scientificName}</p>
    </li>
  );
}

export default MushroomCard;
