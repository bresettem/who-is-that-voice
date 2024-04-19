import React from "react";
import { Row, Col, Table, Badge } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";

export const ModalBioSkeleton = () => {
  return (
    <>
      <Row>
        <Col xs={12} md={4} className="text-center mb-3">
          <Skeleton circle={true} height={"10vw"} width={"10vw"} />
        </Col>
        <Col xs={12} md={8}>
          <div>
            <p>
              <strong>Birth Date:</strong> <Skeleton width={"10vw"} />
            </p>
            <p>
              <strong>Birth Place:</strong> <Skeleton width={"10vw"} />
            </p>
            <p>
              <strong>Gender:</strong> <Skeleton width={"10vw"} />
            </p>
            <p>
              <strong>Height:</strong> <Skeleton width={"10vw"} />
            </p>
          </div>
          <div>
            <h5>Prestigious Award Summary</h5>
            <p>
              Award Nomination: <Skeleton width={"10vw"} />
            </p>
            <Badge variant="success">
              <Skeleton width={"2vw"} />
            </Badge>
            <Badge variant="warning">
              <Skeleton width={"2vw"} />
            </Badge>
          </div>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col xs={12} sm={6} md={4} className="text-center">
          <div className="mb-3">
            <Skeleton height={"2vw"} width={"5vw"} />
          </div>
        </Col>
      </Row>
    </>
  );
};

export const ModalFilmSkeleton = ({ viewMode }) => {
  return (
    <>
      {viewMode === "images" ? (
        <Row>
          {[...Array(12)].map((_, index) => (
            <Col xs={12} sm={6} md={4} key={index}>
              <div key={index} className="mb-3">
                <Skeleton width={"10vw"} height={"15vw"} />
              </div>
            </Col>
          ))}
        </Row>
      ) : (
        <Row>
          <Col xs={12}>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Type</th>
                  <th>Year</th>
                  <th>Characters</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {[...Array(13)].map((_, index) => (
                  <tr key={index}>
                    <td>
                      <Skeleton width={"5vw"} />
                    </td>
                    <td>
                      <Skeleton width={"12vw"} />
                    </td>
                    <td>
                      <Skeleton width={"12vw"} />
                    </td>
                    <td>
                      <Skeleton width={"12vw"} />
                    </td>
                    <td>
                      <Skeleton width={"12vw"} />
                    </td>
                    <td>
                      <Skeleton width={"12vw"} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      )}
    </>
  );
};
