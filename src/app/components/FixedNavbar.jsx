"use client";

import { Container, Nav, Navbar } from "react-bootstrap";

export default function FixedNavbar() {
  return (
    <Navbar expand="lg" bg="primary">
      <Container>
        <Navbar.Brand href="/">
          Who is that voice?
          {process.env.NODE_ENV === "development" ? " (Development)" : ""}
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          className="navbar-toggler custom-toggler"
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
