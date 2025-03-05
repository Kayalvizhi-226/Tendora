// src/context/SearchContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  // Initialize search query state; you can also load from sessionStorage/localStorage if needed
  const [searchQuery, setSearchQuery] = useState("");

  // OPTIONAL: Persist search query in sessionStorage
  // useEffect(() => {
  //   const storedQuery = sessionStorage.getItem("searchQuery");
  //   if (storedQuery) {
  //     setSearchQuery(storedQuery);
  //   }
  // }, []);
  //
  // useEffect(() => {
  //   sessionStorage.setItem("searchQuery", searchQuery);
  // }, [searchQuery]);

  // OPTIONAL: Log search query changes for debugging
  // useEffect(() => {
  //   console.log("Search Query updated:", searchQuery);
  // }, [searchQuery]);

  return (
    <SearchContext.Provider value={{ searchQuery, setSearchQuery }}>
      {children}
    </SearchContext.Provider>
  );
};

SearchProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useSearch = () => useContext(SearchContext);
