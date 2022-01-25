import React from "react";
import { Card, Container, Col, Row, Button } from "react-bootstrap";

export default function Status() {
  return (
    <div>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Your Status</h2>
          <p className="text-center mb-2">
            You've been working on <strong>'Front-End'</strong> for{" "}
            <strong>87 minutes</strong>. Maybe take a break?{" "}
          </p>
        </Card.Body>
        <Container className="d-flex justify-content-center mb-3">
          <Row>
            <Col md="auto">
              <Button variant="success">Available</Button>
            </Col>
            <Col md="auto">
              <Button variant="danger">Busy</Button>
            </Col>
            <Col md="auto">
              <Button variant="danger">In A Call</Button>
            </Col>
            <Col md="auto">
              <Button variant="warning">On A Break</Button>
            </Col>
            <Col md="auto">
              <Button variant="dark">Away</Button>
            </Col>
          </Row>
        </Container>
      </Card>
    </div>
  );
}
