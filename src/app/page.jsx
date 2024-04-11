"use client";
import React, { useState } from "react";
import Navbar from "@/app/components/FixedNavbar";
import MultiSelectTypeahead from "@/app/components/MultiSelectDropdown";
import { Container, Row } from "react-bootstrap";
import DarkModeButton from "@/app/components/DarkModeButton";
export default function Home() {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleOptionSelection = (selected) => {
    setSelectedOptions(selected);
  };

  return (
    <main>
      <Navbar />
      <div className="text-center mt-4 col-md-6 mx-auto"></div>
      <Container>
        <Row className="justify-content-md-center">
          <MultiSelectTypeahead onSelect={handleOptionSelection} />
          <DarkModeButton />
        </Row>
      </Container>
    </main>
  );
}
