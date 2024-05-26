// src/App.jsx - Main application component
import React, { useState, useEffect, useReducer } from 'react';
import SearchBar from './components/SearchBar';
import ResultsList from './components/ResultsList';
import Error from './components/Error';
import mushroomReducer from './components/mushroomReducer'; 

// Main functional component for the application
function App() {
  // State variables using the 'useState' hook
  const [searchResults, setSearchResults] = useState([]); // Stores the mushroom search results
  const [isLoading, setIsLoading] = useState(true); // Indicates if data is being fetched
  const [error, setError] = useState(null); // Stores any errors during data fetching

  // Use the 'useReducer' hook to manage complex state logic
  const [state, dispatch] = useReducer(mushroomReducer, {
    selectedMushroomId: null, // Keep track of the selected mushroom ID
  });

  // 'useEffect' hook to fetch initial mushroom data when the component mounts
  useEffect(() => {
    // Define an async function inside to use 'await' for fetching data
    const fetchInitialMushrooms = async () => {
      setIsLoading(true); // Set loading to true before fetching
      setError(null); // Clear any previous errors

      // Use a try-catch block to handle potential errors during fetching
      try {
        // Call the 'fetchMushrooms' function (presumably from SearchBar.jsx)
        const data = await SearchBar.fetchMushrooms(''); // Fetch without a search term initially
        // Update the 'searchResults' state with the fetched data
        setSearchResults(data.results || []); 
      } catch (error) {
        // Handle any errors during fetching by setting the 'error' state
        setError(error.message || 'An error occurred while fetching data.');
      } finally {
        // Finally, set loading to false, whether the fetch was successful or not
        setIsLoading(false); 
      }
    };

    // Call the async function to start fetching
    fetchInitialMushrooms();
    // The empty dependency array [] ensures this effect runs only once on mount
  }, []); 

  // Function to handle search input changes
  const handleSearchChange = async (searchTerm) => { 
  console.log("handleSearchChange - searchTerm:", searchTerm, typeof searchTerm); // Debugging
     try {
       // Fetch new mushroom data based on the search term
      const data = await SearchBar.fetchMushrooms(searchTerm);
      // Update the 'searchResults' state with the new data
      setSearchResults(data.results || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle error appropriately, e.g., by displaying an error message
    } 
  };

  // JSX to render the application UI
  return (
    // Main container for the app
    <div className='app-container'> 
      {/* Main heading */}
      <h1>Mushroom Identifier</h1>
      {/* Search bar component */}
      <SearchBar onSearchChange={handleSearchChange} /> 
      {/* Container for displaying results */}
      <div className='results-area'>
        {/* Conditionally render loading message, error, or results */}
        {isLoading && <p>Loading mushrooms...</p>} 
        {error && <Error message={error} />} 
        {/* Display results only if not loading and no errors */}
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

// Export the App component as the default export
export default App;

