import React, { useState } from "react";
import { Card, Row, Col, ListGroup } from "react-bootstrap";
import PaginationComponent, { itemsPerPage } from "./PaginationComponent";

const Results = ({ data }) => {
  const [activePage, setActivePage] = useState(1);

  const handlePageChange = (page) => {
    setActivePage(page);
  };

  const startIndex = (activePage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, data.length);
  const currentData = data.slice(startIndex, endIndex);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  return (
    <>
      <Row>
        {currentData.map((item) => (
          <Col key={item.id} xs={12} lg={3} className="mb-4">
            <Card>
              <Card.Img variant="top" src={item.image} className="img-fluid" />
              <div className="position-relative">
                <Card.ImgOverlay className="overlay-bottom">
                  <Card.Title>{item.name}</Card.Title>
                </Card.ImgOverlay>
              </div>
              <Card.Header>{item.title}</Card.Header>
              <Card.Body>
                <Card.Text>{item.characters.join(", ")}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <PaginationComponent
        totalPages={Math.ceil(data.length / itemsPerPage)}
        activePage={activePage}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default Results;
