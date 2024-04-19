import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";

const CardSkeleton = () => {
  return (
    <Row>
      <Col xs={12} lg={3} className="mb-4">
        <Card>
          <Skeleton height={200} />
          <Card.Body>
            <Skeleton height={30} />
            <Skeleton height={100} count={2} />
          </Card.Body>
        </Card>
      </Col>
      <Col xs={12} lg={3} className="mb-4">
        <Card>
          <Skeleton height={200} />
          <Card.Body>
            <Skeleton height={30} />
            <Skeleton height={100} count={2} />
          </Card.Body>
        </Card>
      </Col>
      <Col xs={12} lg={3} className="mb-4">
        <Card>
          <Skeleton height={200} />
          <Card.Body>
            <Skeleton height={30} />
            <Skeleton height={100} count={2} />
          </Card.Body>
        </Card>
      </Col>
      <Col xs={12} lg={3} className="mb-4">
        <Card>
          <Skeleton height={200} />
          <Card.Body>
            <Skeleton height={30} />
            <Skeleton height={100} count={2} />
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default CardSkeleton;
