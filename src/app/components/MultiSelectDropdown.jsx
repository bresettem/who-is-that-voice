"use client";
import React, { useState, useRef } from "react";
import { Typeahead, withAsync } from "react-bootstrap-typeahead";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import "react-bootstrap-typeahead/css/Typeahead.css";
import SearchResults from "./SearchResults";
import FTSearch from "@/app/data/ft_search.json";
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
        items = FTSearch.results.map((result) => ({
          id: result.id,
          title: result.title,
          image: result.image
            ? result.image.url
            : "https://placekitten.com/200/300",
        }));
        console.log("items", items);
      } else {
        // Make API call in production mode
        // Replace with your production API call logic
        // items = await fetchSearchResults(query);
        const options = {
          method: "GET",
          url: `https://imdb8.p.rapidapi.com/title/v2/find`,
          params: {
            title: "game of",
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
        items = response.results.map((result) => ({
          id: result.id,
          title: result.title,
          image: result.image
            ? result.image.url
            : "https://placekitten.com/200/300",
        }));
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
      <img
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
          placeholder="Select options"
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
      <SearchResults
        selectedValues={submittedValues}
        buttonClicked={buttonClicked}
      />
    </>
  );
};

export default MultiSelectDropdown;
