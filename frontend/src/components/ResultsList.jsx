// ResultsList.jsx - A React component to display a list of mushrooms
import React from 'react';
import MushroomCard from './MushroomCard';

function ResultsList({ results }) {
  // 'results' prop will be an array of mushroom data
  return (
    <ul>
      {results.map((mushroom) => (
        <MushroomCard key={mushroom.id} mushroom={mushroom} />
      ))}
    </ul>
  );
}

export default ResultsList;
