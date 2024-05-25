// SearchBar.jsx - A React component for a searchable mushroom database with rate limiting
import React, { useState, useRef } from 'react';

const RATE_LIMIT_MS = 5000;
let isFetching = false;

const fetchMushrooms = async (searchTerm, pageNumber = 1) => {
  try {
    let apiUrl =
      'https://mushroomobserver.org/api2/observations?format=json&detail=high';

    if (searchTerm) {
      apiUrl += `&name=${encodeURIComponent(searchTerm)}`;
    }

    apiUrl += `&page=${pageNumber}`;

    const response = await fetch(apiUrl);

    if (!response.ok) {
      if (response.status === 429) {
        console.warn('Rate limit exceeded. Retrying in 5 seconds...');
        await new Promise((resolve) => setTimeout(resolve, 5000));
        return await fetchMushrooms(searchTerm, pageNumber); // Retry
      } else {
        throw new Error('Something went wrong with the API request!');
      }
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

// Make fetchMushrooms accessible from outside SearchBar
SearchBar.fetchMushrooms = fetchMushrooms;

function SearchBar({ onSearchChange }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isFetching) {
      console.warn('A fetch request is already in progress.');
      return;
    }

    isFetching = true;

    try {
      const data = await fetchMushrooms(searchTerm);
      onSearchChange(data.results || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle error appropriately, e.g., by setting an error state
    } finally {
      setTimeout(() => {
        isFetching = false;
      }, RATE_LIMIT_MS);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder="Search for a mushroom..."
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchBar;

