import React, { useState } from "react";
import { Card, CardGroup, Alert, Container, Row, Col } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Status from "./Status/Status";
import Header from "./Header/Header";
import Greeting from "./Header/Greeting";
import Toasts from "./Toasts/Toasts";

export default function Dashboard() {
  const [error, setError] = useState("");
  const { currentUser, currentUserData, teamData, baseData } = useAuth();

  return (
    <>
      <Container
        className="mt-3 align-items-center justify-content-center"
        fluid
      >
        <div className="w-100">
          <Header />
          <Row xs={1} md={2} className="g-4">
            <Col>
              <Card className="m-2">
                <Card.Body>
                  {error && <Alert variant="danger">{error}</Alert>}
                  <Greeting />
                  <strong>Full Name: </strong> {currentUserData.fname}{" "}
                  {currentUserData.lname} <br />
                  <strong>Work Email: </strong> {currentUser.email}
                  <br />
                  <strong>Current Team: </strong> {teamData.name} [
                  <strong>{teamData.status}</strong>]
                  <br />
                  <strong>Current Base: </strong> {baseData.name},{" "}
                  {baseData.country}
                  <br />
                  <strong>Operating Region: </strong> {baseData.region}
                  <br />
                  <strong>Base Dialling Code: </strong> +{baseData.code}
                  <br />
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Status />
            </Col>
            <Col>
              <Card className="m-2">
                <Card.Body>
                  {error && <Alert variant="danger">{error}</Alert>}
                  <h2 className="text-center mb-4">Your Active Tasks</h2>
                  <Card className="mb-2">
                    <Card.Body>
                      <FontAwesomeIcon icon="fa-solid fa-pencil" /> Draft
                      presentation for Operating Management team
                    </Card.Body>
                  </Card>
                  <Card className="mb-2">
                    <Card.Body>
                      <FontAwesomeIcon icon="fa-solid fa-pencil" /> Send invoice
                      to Typed for January 2022 services
                    </Card.Body>
                  </Card>
                  <Card className="mb-2">
                    <Card.Body>
                      <FontAwesomeIcon icon="fa-solid fa-pencil" /> Schedule
                      meeting with Sarah regarding the building-tier rating
                      system
                    </Card.Body>
                  </Card>
                  <Card className="mb-2">
                    <Card.Body>
                      <FontAwesomeIcon icon="fa-solid fa-pencil" /> Complete
                      onDisconnect functionality for Project Sierra
                    </Card.Body>
                  </Card>
                  <br />
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card className="m-2">
                <Card.Body>
                  {error && <Alert variant="danger">{error}</Alert>}
                  <h2 className="text-center mb-4">Your Appraisals</h2>
                  <Card className="mb-2">
                    <Card.Body>
                      <FontAwesomeIcon icon="fa-solid fa-gift" /> Mary{" "}
                      <strong>gave you a reward!</strong>{" "}
                      <i>"Great presentation. Loved the 18-month forecast."</i>
                    </Card.Body>
                  </Card>
                  <Card className="mb-2">
                    <Card.Body>
                      <FontAwesomeIcon icon="fa-solid fa-gift" /> Zack{" "}
                      <strong>gave you a reward!</strong>{" "}
                      <i>"Firestore briefing doc was so helpful! Thanks"</i>
                    </Card.Body>
                  </Card>
                  <Card className="mb-2">
                    <Card.Body>
                      <FontAwesomeIcon icon="fa-solid fa-circle-exclamation" />{" "}
                      Sarah <strong>has a suggestion!</strong>{" "}
                      <i>
                        "Tier-rating logic wasn't explicit. Let's schedule a
                        call."
                      </i>
                    </Card.Body>
                  </Card>
                  <br />
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Toasts />
        </div>
      </Container>
    </>
  );
}
