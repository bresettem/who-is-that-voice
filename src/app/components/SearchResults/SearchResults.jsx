// SearchResults.jsx
import React, { useState, useEffect } from "react";
import extractId from "./IdExtractor";
import actors from "./Actors";
import Results from "./Results";
import { Row } from "react-bootstrap";
import { all } from "axios";

const SearchResults = ({ selectedValues, buttonClicked }) => {
  const [allActors, setAllActors] = useState([]);

  useEffect(() => {
    const fetchActors = async () => {
      try {
        const actorPromises = selectedValues.map((option) => {
          const id = extractId(option.id);
          return actors(id);
        });

        const resolvedActors = (await Promise.all(actorPromises)).flat();
        setAllActors(resolvedActors);
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
            {allActors.length > 0
              ? `Selected values: ${allActors.length}`
              : "No results found."}
          </h2>

          {allActors.length > 0 && <Row>{<Results data={allActors} />}</Row>}
        </>
      )}
    </>
  );
};

export default SearchResults;
