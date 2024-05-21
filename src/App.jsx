// E:\SBA320\src\App.jsx
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import SearchBar from './components/SearchBar';
import ResultsList from './components/ResultsList';
function App() {
  const [mushrooms, setMushrooms] = useState([]); // State for all mushrooms
  const [searchResults, setSearchResults] = useState([]); // State for filtered results

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/data/names.csv'); // Adjust path if needed
      const reader = response.body.getReader();
      const result = await reader.read(); // Get all data from CSV
      const decoder = new TextDecoder('utf-8');
      const csv = decoder.decode(result.value); 
      
      Papa.parse(csv, {
        header: true,
        complete: (results) => {
          setMushrooms(results.data); 
        }
      });
    };
    fetchData();
  }, []); 

  const handleSearch = (searchTerm) => {
    // Implement search logic here using the 'mushrooms' state
    // Update searchResults state with filtered results
  };

  return (
    <div>
      <h1>Mushroom Identification Helper</h1>
      <SearchBar onSearch={handleSearch} />
      <ResultsList results={searchResults} /> 
    </div>
  );
}

export default App; 
