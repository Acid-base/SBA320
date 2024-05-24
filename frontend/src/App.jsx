// App.jsx - The main component
export default App;
import React, { useState, useEffect } from 'react';
import Papa from 'papaparse'; 
import SearchBar from './components/SearchBar';
import ResultsList from './components/ResultsList';

function App() {
  const [mushrooms, setMushrooms] = useState([]); // All mushroom data
  const [searchResults, setSearchResults] = useState([]); // Filtered results
  function App() {
    const [mushrooms, setMushrooms] = useState([]); // All mushroom data
    const [searchResults, setSearchResults] = useState([]); // Filtered results

    useEffect(() => {
      // This effect runs after the component renders
      const fetchMushrooms = async () => {
        try {
          // Fetch your CSV data (replace '/mushrooms.csv' with the correct URL)
          const response = await fetch('/mushrooms.csv');
          const reader = response.body.getReader();
          const result = await reader.read();
          const decoder = new TextDecoder('utf-8');
          // ... (parse CSV data using Papa.parse or similar) ...
        } catch (error) {
          console.error("Error fetching data:", error);
          // Handle the error (e.g., display an error message)
        }
      };
      useEffect(() => {
        // This effect runs after the component renders
        const fetchMushrooms = async () => {
          try {
            // Fetch your CSV data (replace '/mushrooms.csv' with the correct URL)
            const response = await fetch('/mushrooms.csv');
            const reader = response.body.getReader();
            const result = await reader.read();
            const decoder = new TextDecoder('utf-8');
            const csvData = decoder.decode(result.value);

            // Parse the CSV data with Papa Parse
            Papa.parse(csvData, {
              header: true, // Assuming your CSV has headers
              complete: (parsedData) => {
                setMushrooms(parsedData.data);
              },
              error: (error) => {
                console.error("Error parsing CSV:", error);
              }
            });
          } catch (error) {
            console.error("Error fetching data:", error);
            // Handle the error (e.g., display an error message)
          }
        };

        // Call the function to fetch data when the component mounts
        fetchMushrooms();
      }, []); // The empty array [] means this effect runs once on mount
      // Call the function to fetch data when the component mounts
      fetchMushrooms();
    }, []); // The empty array [] means this effect runs once on mount

    const handleSearch = (searchTerm) => {
      // Filter the 'mushrooms' array based on the 'searchTerm'
      const results = mushrooms.filter(mushroom =>
        mushroom.commonName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      // Update 'searchResults' state with the filtered results
      setSearchResults(results);
    };
   

    return (
      <div>
        <h1>Mushroom Identification Helper</h1>
        <SearchBar onSearch={handleSearch} />
        {/* Pass the 'handleSearch' function to SearchBar */}
        <ResultsList results={searchResults} />
        {/* Pass the filtered 'searchResults' to ResultsList */}
      </div>
    );
  }

  
}
