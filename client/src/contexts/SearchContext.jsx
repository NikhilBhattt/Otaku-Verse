import React, { createContext, useState } from 'react';

// Create a context
export const SearchContext = createContext('');

// Create a provider component
export const SearchProvider = ({ children }) => {
  const [Search, setSearch] = useState('');

  return (
    <SearchContext.Provider value={{ Search, setSearch }}>
      {children}
    </SearchContext.Provider>
  );
}; 