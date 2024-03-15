"use client";
import React, { useState } from "react";
import Navbar from "@/app/components/FixedNavbar";
import MultiSelectTypeahead from "@/app/components/MultiSelectDropdown";
import { Container, Row } from "react-bootstrap";

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
          <MultiSelectTypeahead onSelect={handleOptionSelection} />
        </Row>
      </Container>
    </main>
  );
}
