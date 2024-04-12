"use client";
import React, { useState, useRef } from "react";
import { Typeahead, withAsync } from "react-bootstrap-typeahead";
import { Button, InputGroup, Col, Image } from "react-bootstrap";
import "react-bootstrap-typeahead/css/Typeahead.css";
import SearchResults from "./SearchResults/SearchResults";
import FTSearch from "@/app/data/ft_search.json";
import HowNotToSearch from "@/app/data/how_not_to_summon_a_demon_lord_search.json";
import axios from "axios";

const AsyncTypeahead = withAsync(Typeahead);

const MultiSelectDropdown = ({ onSelect }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [values, setValues] = useState([]);
  const [submittedValues, setSubmittedValues] = useState([]);
  const [buttonClicked, setButtonClicked] = useState(false);
  const typeaheadRef = useRef(null);

  const handleSearch = async (query) => {
    setIsLoading(true);

    try {
      let items = [];

      if (process.env.NODE_ENV === "development") {
        console.log("query", query);
        if (query.toLowerCase().includes("how")) {
          items.push(
            ...HowNotToSearch.results.map((result) => ({
              id: result.id,
              title: result.title,
              image: result.image
                ? result.image.url
                : "https://placekitten.com/200/300",
            }))
          );
        }

        // If the query contains "Fairy", include the Fairy data
        if (query.toLowerCase().includes("fairy")) {
          items.push(
            ...FTSearch.results.map((result) => ({
              id: result.id,
              title: result.title,
              image: result.image
                ? result.image.url
                : "https://placekitten.com/200/300",
            }))
          );
        }
        if (items.length === 0) {
          throw new Error("Items is empty");
        }
        console.log("items", items);
      } else {
        const options = {
          method: "GET",
          url: `https://imdb8.p.rapidapi.com/title/v2/find`,
          params: {
            title: query,
            limit: "20",
            sortArg: "moviemeter,asc",
          },
          headers: {
            "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPIDAPI_KEY,
            "X-RapidAPI-Host": "imdb8.p.rapidapi.com",
          },
        };
        const response = await axios.request(options);
        console.log(response.data);
        items = response.data.results.map((result) => ({
          id: result.id,
          title: result.title,
          image: result.image
            ? result.image.url
            : "https://placekitten.com/200/300",
        }));
      }
      if (items.length === 0) {
        throw new Error("Items is empty");
      }
      console.log("items", items);
      setOptions(items);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOnChange = (selected) => {
    setValues(selected);
  };

  const handleButtonClick = () => {
    console.log("values", values);
    setButtonClicked(true);
    onSelect(values);
    setButtonDisabled(true);
    setSubmittedValues(values);
    setTimeout(() => {
      setButtonDisabled(false);
    }, 1000);
  };

  const renderMenuItemChildren = (option) => (
    <>
      <Image
        alt={option.title}
        src={option.image}
        style={{
          height: "24px",
          marginRight: "10px",
          width: "24px",
        }}
      />
      <span>{option.title}</span>
    </>
  );

  const filterBy = () => true;

  return (
    <>
      <Col xs={12} lg="6">
        <InputGroup className="mb-3">
          <AsyncTypeahead
            ref={typeaheadRef}
            id="multi-select-typeahead"
            filterBy={filterBy}
            multiple
            options={options.filter(
              (option) => !values.some((value) => value.id === option.id)
            )}
            labelKey="title"
            placeholder="Series name or movie"
            isLoading={isLoading}
            onChange={handleOnChange}
            onSearch={handleSearch}
            renderMenuItemChildren={renderMenuItemChildren}
          />
          <Button
            variant="secondary"
            id="button-addon2"
            onClick={handleButtonClick}
            disabled={buttonDisabled}
          >
            Search
          </Button>
        </InputGroup>
      </Col>
      <Col xs lg="8">
        {buttonClicked && (
          <SearchResults
            selectedValues={submittedValues}
            buttonClicked={buttonClicked}
          />
        )}
      </Col>
    </>
  );
};

export default MultiSelectDropdown;
