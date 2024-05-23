import React from 'react';
import MushroomCard from './MushroomCard';

function ResultsList({ results }) { // results prop will be passed from App
  return (
    <ul>
      {results.map(result => (
        <MushroomCard key={result.id} mushroom={result} />
      ))}
    </ul>
  );
}

export default ResultsList;
