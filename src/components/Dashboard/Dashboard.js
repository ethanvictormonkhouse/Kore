import React, { useState } from "react";
import { Card, Alert, Row, Col } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Status from "./Status/Status";
import Header from "./Header/Header";
import Greeting from "./Header/Greeting";
import Toasts from "./Toasts/Toasts";

export default function Dashboard() {
  const [error, setError] = useState("");
  const {
    currentUser,
    currentUserData,
    currentUserStatus,
    updateStatus,
    teamMembers,
    teamData,
    baseData,
  } = useAuth();

  return (
    <>
      <div className="w-100">
        <Header />
        <Row xs={1} md={1} lg={2} className="g-1">
          <Col>
            <Card className="m-2">
              <Card.Body>
                <h2 className="text-center mb-4">
                  <Greeting />
                </h2>
                <Row xs={1} md={1} lg={2} className="g-2">
                  <Col>
                    <Card bg="secondary" text="primary">
                      <Card.Body>
                        <FontAwesomeIcon
                          className="mb-2"
                          icon="fa-solid fa-user"
                          size="2x"
                        />
                        <br />
                        <strong>Full Name: </strong> {currentUserData.fname}{" "}
                        {currentUserData.lname}
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col>
                    <Card bg="secondary" text="primary">
                      <Card.Body>
                        <FontAwesomeIcon
                          className="mb-2"
                          icon="fa-solid fa-at"
                          size="2x"
                        />
                        <br />
                        <strong>Work Email: </strong> {currentUser.email}
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col>
                    <Card bg="secondary" text="primary">
                      <Card.Body>
                        <FontAwesomeIcon
                          className="mb-2"
                          icon="fa-solid fa-users"
                          size="2x"
                        />
                        <br />
                        <strong>Current Team: </strong> {teamData.name}
                        <strong> [{teamData.status}]</strong>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col>
                    <Card bg="secondary" text="primary">
                      <Card.Body>
                        <FontAwesomeIcon
                          className="mb-2"
                          icon="fa-solid fa-building"
                          size="2x"
                        />
                        <br />
                        <strong>Current Base: </strong> {baseData.name},{" "}
                        {baseData.country}
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col>
                    <Card bg="secondary" text="primary">
                      <Card.Body>
                        <FontAwesomeIcon
                          className="mb-2"
                          icon="fa-solid fa-globe"
                          size="2x"
                        />
                        <br />
                        <strong>Operating Region: </strong> {baseData.region}
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col>
                    <Card bg="secondary" text="primary">
                      <Card.Body>
                        <FontAwesomeIcon
                          className="mb-2"
                          icon="fa-solid fa-phone"
                          size="2x"
                        />
                        <br />
                        <strong>Base Dialling Code: </strong> +{baseData.code}
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Status
              auth={(currentUser, currentUserStatus, updateStatus, teamMembers)}
            />
          </Col>
          <Col>
            <Card bg="primary" text="light" className="m-2">
              <Card.Body>
                {error && <Alert variant="danger">{error}</Alert>}
                <h2 className="text-center mb-4">Your Active Tasks</h2>
                <Card bg="primary" text="light" className="mb-2">
                  <Card.Body>
                    <FontAwesomeIcon icon="fa-solid fa-pencil" /> Draft
                    presentation for Operating Management team
                  </Card.Body>
                </Card>
                <Card bg="primary" text="light" className="mb-2">
                  <Card.Body>
                    <FontAwesomeIcon icon="fa-solid fa-pencil" /> Send invoice
                    to Typed for January 2022 services
                  </Card.Body>
                </Card>
                <Card bg="primary" text="light" className="mb-2">
                  <Card.Body>
                    <FontAwesomeIcon icon="fa-solid fa-pencil" /> Schedule
                    meeting with Sarah regarding the building-tier rating system
                  </Card.Body>
                </Card>
                <Card bg="primary" text="light" className="mb-2">
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
            <Card bg="primary" text="light" className="m-2">
              <Card.Body>
                {error && <Alert variant="danger">{error}</Alert>}
                <h2 className="text-center mb-4">Your Appraisals</h2>
                <Card bg="primary" text="light" className="mb-2">
                  <Card.Body>
                    <FontAwesomeIcon icon="fa-solid fa-gift" /> Mary{" "}
                    <strong>gave you a reward!</strong>{" "}
                    <i>"Great presentation. Loved the 18-month forecast."</i>
                  </Card.Body>
                </Card>
                <Card bg="primary" text="light" className="mb-2">
                  <Card.Body>
                    <FontAwesomeIcon icon="fa-solid fa-gift" /> Zack{" "}
                    <strong>gave you a reward!</strong>{" "}
                    <i>"Firestore briefing doc was so helpful! Thanks"</i>
                  </Card.Body>
                </Card>
                <Card bg="primary" text="light" className="mb-2">
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
    </>
  );
}
