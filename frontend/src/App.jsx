// src/App.jsx - Main application component
import React, { useState, useEffect, useReducer } from 'react';
import SearchBar from './components/SearchBar';
import ResultsList from './components/ResultsList';
import Error from './components/Error';
import mushroomReducer from './components/mushroomReducer'; 

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [state, dispatch] = useReducer(mushroomReducer, {
    selectedMushroomId: null,
  });

  useEffect(() => {
    const fetchInitialMushrooms = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Fetch initial mushrooms using SearchBar's function
        const data = await SearchBar.fetchMushrooms(''); 
        setSearchResults(data.results || []);
      } catch (error) {
        setError(error.message || 'An error occurred while fetching data.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialMushrooms(); 
  }, []);

  const handleSearchChange = async (searchTerm) => {
    try {
      // Fetch mushrooms using SearchBar's function 
      const data = await SearchBar.fetchMushrooms(searchTerm); 
      setSearchResults(data.results || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle error appropriately (e.g., set an error state)
    } 
  };

  return (
    <div className='app-container'>
      <h1>Mushroom Identifier</h1>
      <SearchBar onSearchChange={handleSearchChange} />
      <div className='results-area'>
        {isLoading && <p>Loading mushrooms...</p>}
        {error && <Error message={error} />}
        {!isLoading && !error && (
          <ResultsList
            results={searchResults}
            state={state}
            dispatch={dispatch}
          />
        )}
      </div>
    </div>
  );
}

export default App;
