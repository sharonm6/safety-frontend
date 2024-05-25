import React from 'react';

const SearchBar = ({ dataSource, onChange, onRequestSearch, style }) => {
  return (
    <div style={style}>
      <input
        type="text"
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search..."
        style={{ width: '100%', padding: '10px' }}
      />
      {/* <button onClick={onRequestSearch} style={{ padding: '10px 20px' }}>
        Search
      </button> */}
    </div>
  );
};

export default SearchBar;
