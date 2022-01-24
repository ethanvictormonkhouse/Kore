import React, { useState } from "react";
import { Card, CardGroup, Alert, Container } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";

import Status from "./Status/Status";
import Navbar from "./Status/Header/Header";
import Greeting from "./Status/Header/Greeting";

export default function Dashboard() {
  const [error, setError] = useState("");
  const { currentUser, currentUserData } = useAuth();

  return (
    <>
      <Container
        className="mt-3 align-items-center justify-content-center"
        fluid
      >
        <div className="w-100">
          <Navbar />
          <CardGroup>
            <Card>
              <Card.Body>
                {error && <Alert variant="danger">{error}</Alert>}
                <Greeting />
                <strong>Full Name: </strong> {currentUserData.fname}{" "}
                {currentUserData.lname} <br />
                <strong>Work Email: </strong> {currentUser.email}
                <br />
                <strong>Current Team: </strong> {currentUserData.team}
                <br />
                <strong>Current Base: </strong> {currentUserData.base}
                <br />
              </Card.Body>
            </Card>
            <Card>
              <Card.Body>
                <Status />
              </Card.Body>
            </Card>
          </CardGroup>
        </div>
      </Container>
    </>
  );
}
