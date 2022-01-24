import React from "react";
import LogoutButton from "./LogoutButton";
import UpdateProfile from "./UpdateProfile";

import { Navbar, Nav, Container, Row, Col } from "react-bootstrap";

export default function Header() {
  return (
    <div>
      <>
        <Navbar bg="light" variant="light">
          <Container>
            <Navbar.Brand href="#home">
              <img
                src="/logo512d.png"
                width="50"
                height="50"
                className="d-inline-block align-top"
                alt="Logo Dark"
              />
            </Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="#home">Dashboard</Nav.Link>
              <Nav.Link href="#projects">Projects</Nav.Link>
              <Nav.Link href="#rewards">Rewards</Nav.Link>
              <Nav.Link href="#insights">Insights</Nav.Link>
              <Nav.Link href="#help">Help</Nav.Link>
            </Nav>
          </Container>
          <Container className="mx-2  justify-content-end">
            <Row>
              <Col md="auto">
                <UpdateProfile />
              </Col>
              <Col md="auto">
                <LogoutButton />
              </Col>
            </Row>
          </Container>
        </Navbar>
        <br />
      </>
    </div>
  );
}
