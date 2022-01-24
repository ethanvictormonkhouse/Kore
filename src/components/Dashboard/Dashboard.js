import React, { useState } from "react";
import { Card, Alert, Container } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";

import Status from "./Status/Status";
import Header from "./Status/Header/Header";

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
          <Card>
            <Card.Body>
              <Header />
              {error && <Alert variant="danger">{error}</Alert>}
              <strong>Full Name: </strong> {currentUserData.fname}{" "}
              {currentUserData.lname} <br />
              <strong>Work Email: </strong> {currentUser.email}
              <br />
              <strong>Current Team: </strong> {currentUserData.team}
              <br />
              <strong>Current Base: </strong> {currentUserData.base}
              <br />
              <br />
              <Status />
              <Link to="/update-profile" className="btn btn-dark w-100 mt-3">
                Update Profile
              </Link>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </>
  );
}
