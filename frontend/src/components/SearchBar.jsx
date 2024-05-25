// SearchBar.jsx - A React component for a search bar
import React, { useState } from 'react';

function SearchBar({ onSearch }) { 
  // 'onSearch' prop will be a function from the parent component 
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (event) => {
    // Update 'searchTerm' state whenever the input changes
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    // Prevent default form submission
    event.preventDefault();
    // Call the 'onSearch' function from the parent with the search term
    onSearch(searchTerm); 
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

