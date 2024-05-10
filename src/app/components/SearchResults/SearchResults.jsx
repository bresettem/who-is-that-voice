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
    setLoading(true);

    if (buttonClicked && selectedValues.length > 0) {
      const fetchActors = async () => {
        try {
          const actorPromises = selectedValues.map((option) => {
            const id = extractId(option.id);
            return actors(id);
          });

          const resolvedActors = await Promise.all(actorPromises);

          const sameNameElements = await Promise.all(
            SameNameElements(resolvedActors)
          );
          setResults(sameNameElements);
        } catch (error) {
          console.error("Error fetching actors:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchActors();
    } else {
      setResults([]);
      setLoading(false);
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
              `Actors: ${results.length}`
            ) : (
              "No results found."
            )}
          </h2>

          {loading ? (
            <CardSkeleton />
          ) : (
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
