// SearchBar.jsx
import PropTypes from 'prop-types'; 

function SearchBar({ searchTerm, setSearchTerm }) { 
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <input
      type="text"
      value={searchTerm}
      onChange={handleChange}
      placeholder="Search for a mushroom..."
    />
  );
}

SearchBar.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  setSearchTerm: PropTypes.func.isRequired,
};

export default SearchBar;
