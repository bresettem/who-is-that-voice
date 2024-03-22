// SearchResults.jsx
import React, { useState, useEffect } from "react";
import extractId from "./IdExtractor";
import actors from "./Actors";
import Results from "./Results";
import SameNameElements from "./SameNameElements";
import { Row } from "react-bootstrap";
import { all } from "axios";

const SearchResults = ({ selectedValues, buttonClicked }) => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchActors = async () => {
      try {
        const actorPromises = selectedValues.map((option) => {
          const id = extractId(option.id);
          return actors(id);
        });

        const resolvedActors = await Promise.all(actorPromises);
        console.log("resolvedActors", resolvedActors);

        const sameNameElements = await Promise.all(
          SameNameElements(resolvedActors)
        );
        console.log("sameNameElements", sameNameElements);
        setResults(sameNameElements);
      } catch (error) {
        console.error("Error fetching actors:", error);
      }
    };

    if (buttonClicked && selectedValues.length > 0) {
      fetchActors();
    }
  }, [selectedValues, buttonClicked]);

  return (
    <>
      {buttonClicked && (
        <>
          <h2>
            {results.length > 0
              ? `Selected values: ${results.length}`
              : "No results found."}
          </h2>

          {results.length > 0 && <Row>{<Results data={results} />}</Row>}
        </>
      )}
    </>
  );
};

export default SearchResults;
