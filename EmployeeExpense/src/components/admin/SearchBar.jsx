import React from 'react';
import './admin.css';

const SearchBar = ({ searchQuery, onSearchChange }) => {
  return (
    <input
      type="text"
      placeholder="Search by Employee ID"
      value={searchQuery}
      onChange={(e) => onSearchChange(e.target.value)}
      className="search-bar"
    />
  );
};

export default SearchBar;
