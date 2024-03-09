"use client";
import React, { useState } from "react";
import Navbar from "@/app/components/FixedNavbar";
import MultiSelectTypeahead from "@/app/components/MultiSelectDropdown";
import SearchResults from "@/app/components/SearchResults";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function Home() {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleOptionSelection = (selected) => {
    setSelectedOptions(selected);
  };

  return (
    <main>
      <Navbar />
      <div className="text-center mt-4 col-md-6 mx-auto">
        <h1 className="">Hello</h1>
      </div>
      <Container>
        <Row className="justify-content-md-center">
          <Col xs lg="6">
            <MultiSelectTypeahead onSelect={handleOptionSelection} />
          </Col>
        </Row>
        <Row className="justify-content-md-center mt-5">
          <Col md="auto">
            <SearchResults options={selectedOptions} />
          </Col>
        </Row>
      </Container>
    </main>
  );
}
