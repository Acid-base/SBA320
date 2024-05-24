// ResultsList.jsx - A React component to display a list of mushrooms
import React from 'react';
import MushroomCard from './MushroomCard'; // Import the MushroomCard component

function ResultsList({ results }) { 
  // 'results' prop will be an array of mushroom data
  return (
    <ul>
      {results.map(result => (
        // Map through 'results' and render a MushroomCard for each
        <MushroomCard key={result.id} mushroom={result} />
      ))}
    </ul>
  );
}

export default ResultsList;
