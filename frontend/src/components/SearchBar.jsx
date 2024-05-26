// src/components/SearchBar.jsx - A React component for a searchable mushroom database with rate limiting

import React, { useState, useRef } from 'react';

// Constant for rate limiting API requests (5 seconds)
const RATE_LIMIT_MS = 5000;
// Variable to track if a fetch request is in progress (initialized to false)
let isFetching = false;

// Asynchronous function to fetch mushroom data from the API
const fetchMushrooms = async (searchTerm, pageNumber = 1) => {
  try {
    // Base API URL for Mushroom Observer
    let apiUrl =
      'https://mushroomobserver.org/api2/observations?format=json&detail=high';

    // Add search term to the URL if provided
    if (searchTerm) {
      apiUrl += `&name=${encodeURIComponent(searchTerm)}`;
    }

    // Add page number to the URL
    apiUrl += `&page=${pageNumber}`;

    // Fetch data from the constructed API URL
    const response = await fetch(apiUrl);

    // Check if the response status is OK (200-299)
    if (!response.ok) {
      // Handle rate limiting (HTTP status code 429)
      if (response.status === 429) {
        console.warn('Rate limit exceeded. Retrying in 5 seconds...');
        // Wait for 5 seconds before retrying the request
        await new Promise((resolve) => setTimeout(resolve, 5000));
        // Recursively call fetchMushrooms to retry the request
        return await fetchMushrooms(searchTerm, pageNumber); 
      } else {
        // Throw an error for other HTTP error statuses
        throw new Error('Something went wrong with the API request!');
      }
    }

    // Parse the response body as JSON
    const data = await response.json();
    // Return the fetched data
    return data;
  } catch (error) {
    // Log the error to the console
    console.error('Error fetching data:', error);
    // Re-throw the error to be handled by the caller
    throw error;
  }
};

// Make the fetchMushrooms function accessible outside of the SearchBar component
SearchBar.fetchMushrooms = fetchMushrooms;

// Functional component for the SearchBar
function SearchBar({ onSearchChange }) {
  // State variable to store the current search term
  const [searchTerm, setSearchTerm] = useState('');

  // Event handler for input changes
  const handleChange = (event) => {
    // Update the search term state with the input value
    setSearchTerm(event.target.value);
  };

  // Event handler for form submission
  const handleSubmit = async (event) => {
    // Prevent default form submission behavior
    event.preventDefault();

    // Check if a fetch request is already in progress
    if (isFetching) {
      // Log a warning to the console and return early
      console.warn('A fetch request is already in progress.');
      return;
    }

    // Set isFetching to true to indicate a fetch is in progress
    isFetching = true;

    // Try-catch block to handle errors during fetching
    try {
      // Fetch mushroom data using the current search term
      const data = await fetchMushrooms(searchTerm);
      // Call the onSearchChange prop (passed from parent component) with the fetched results
      onSearchChange(data.results || []);
    } catch (error) {
      // Log the error to the console
      console.error('Error fetching data:', error);
      // Handle the error appropriately, e.g., display an error message to the user
    } finally {
      // Use setTimeout to set isFetching back to false after the rate limit duration
      setTimeout(() => {
        isFetching = false;
      }, RATE_LIMIT_MS);
    }
  };

  // JSX to render the search bar form
  return (
    <form onSubmit={handleSubmit}>
      {/* Input field for search term */}
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder="Search for a mushroom..."
      />
      {/* Submit button for the search form */}
      <button type="submit">Search</button>
    </form>
  );
}

// Export the SearchBar component as the default export
export default SearchBar;

