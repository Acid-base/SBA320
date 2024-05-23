import React, { useState } from 'react';

function SearchBar({ onSearch }) { // onSearch prop will be passed from App
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={searchTerm} onChange={handleChange} placeholder="Search for a mushroom..." />
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchBar;
