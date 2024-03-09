// SearchResults.jsx
import React from "react";

const SearchResults = ({ selectedValues, buttonClicked }) => {
  return (
    <>
      {buttonClicked && (
        <div>
          <h2>Selected values</h2>
          <ul>
            {selectedValues.map((option) => (
              <li key={option.id}>{option.title}</li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default SearchResults;
