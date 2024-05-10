import React, { useState } from "react";
import { Card, Row, Col } from "react-bootstrap";
import PaginationComponent, { itemsPerPage } from "./PaginationComponent";
import ProfileModal from "@/app/components/Profile/ProfileModal";
import Link from "next/link";

const Results = ({ data }) => {
  const [activePage, setActivePage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);

  const handleShowModal = (event, id) => {
    event.preventDefault();
    setSelectedItemId(id);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedItemId(null);
  };

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
        {currentData.map((item, index) => (
          <Col key={`${item.id}-${index}`} xs={12} lg={3} className="mb-4">
            <Card>
              <Card.Img
                variant="top"
                src={item.image}
                className=""
                alt={item.name}
              />
              <div className="position-relative">
                <Card.ImgOverlay className="overlay-bottom">
                  <Card.Title>
                    <Link href="#" onClick={(e) => handleShowModal(e, item.id)}>
                      {item.name && item.name}
                    </Link>
                  </Card.Title>
                </Card.ImgOverlay>
              </div>
              <Card.Body>
                <Row>
                  {item.characters &&
                    item.characters.map((character, index) => (
                      <Col key={`${item.id}-${index}`} xs={12} className="mb-2">
                        <Card>
                          <Card.Body>
                            <Card.Title>{character.title}</Card.Title>
                            <Card.Text>
                              {character.characters.length > 0 && (
                                <>
                                  <strong>Characters: </strong>
                                  {character.characters.join(", ")}
                                  <br />
                                </>
                              )}
                              {character.episodeNum > 0 && (
                                <>
                                  <strong>Episode Number: </strong>
                                  {character.episodeNum}
                                </>
                              )}

                              <br />
                            </Card.Text>
                          </Card.Body>
                        </Card>
                      </Col>
                    ))}
                </Row>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <PaginationComponent
        totalPages={totalPages}
        activePage={activePage}
        onPageChange={handlePageChange}
      />
      <ProfileModal
        show={showModal}
        handleClose={handleCloseModal}
        itemId={selectedItemId}
      />
    </>
  );
};

export default Results;
