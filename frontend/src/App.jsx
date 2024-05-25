// src/App.jsx - Main application component
import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import ResultsList from './components/ResultsList';

function App() {
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    // Fetch initial mushroom data when the app loads
    const fetchInitialMushrooms = async () => {
      try {
        const data = await fetchMushrooms(''); // Fetch without a search term
        setSearchResults(data.results || []);
      } catch (error) {
        console.error('Error fetching initial mushrooms:', error); 
        // Handle error appropriately (e.g., set an error state)
      }
    };

    fetchInitialMushrooms();
  }, []); // Empty dependency array ensures this runs once on mount

  const handleSearchChange = (results) => {
    setSearchResults(results);
  };
  return (
    <div className="app-container">
      <h1>Mushroom Identifier</h1>

      <SearchBar onSearchChange={handleSearchChange} /> 
      <ResultsList results={searchResults} /> 
    </div>
  );
}

export default App;
