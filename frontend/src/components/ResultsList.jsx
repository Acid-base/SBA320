// ResultsList.jsx
import React from 'react';
import MushroomCard from './MushroomCard';

function ResultsList({ results, state, dispatch }) {
  return (
    <ul>
      {results.map((mushroom) => (
        <MushroomCard
          key={mushroom.id}
          mushroom={mushroom}
          isSelected={mushroom.id === state.selectedMushroomId}
          onSelect={() =>
            dispatch({
              type: 'SELECT_MUSHROOM',
              payload: mushroom.id,
            })
          }
        />
      ))}
    </ul>
  );
}

export default ResultsList;
