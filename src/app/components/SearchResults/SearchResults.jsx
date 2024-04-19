import React, { useState, useEffect } from "react";
import extractId from "./IdExtractor";
import actors from "./Actors";
import Results from "./Results";
import SameNameElements from "./SameNameElements";
import Skeleton from "react-loading-skeleton";
import CardSkeleton from "@/app/components/Skeletons/CardSkeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Row } from "react-bootstrap";

const SearchResults = ({ selectedValues, buttonClicked }) => {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  useEffect(() => {
    // Set loading state to true when data fetching starts
    setLoading(true);

    // Only fetch data if button is clicked and there are selected values
    if (buttonClicked && selectedValues.length > 0) {
      const fetchActors = async () => {
        try {
          // await new Promise((resolve) => setTimeout(resolve, 3000));

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
        } finally {
          // Set loading state to false when data fetching completes
          setLoading(false);
        }
      };

      fetchActors();
    } else {
      // Reset results and loading state if button is not clicked or no values are selected
      setResults([]);
      setLoading(false); // Also set loading state to false here
    }
  }, [selectedValues, buttonClicked]);

  return (
    <>
      {buttonClicked && (
        <>
          <h2>
            {loading ? (
              <Skeleton width={200} />
            ) : results.length > 0 ? (
              `Selected values: ${results.length}`
            ) : (
              "No results found."
            )}
          </h2>

          {loading ? (
            <CardSkeleton />
          ) : (
            // Show results when data is fetched
            results.length > 0 && (
              <Row>
                <Results data={results} />
              </Row>
            )
          )}
        </>
      )}
    </>
  );
};

export default SearchResults;
