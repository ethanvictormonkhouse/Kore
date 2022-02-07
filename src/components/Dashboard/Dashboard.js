import React from "react";
import { Card, Row, Col, Image } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Status from "./Status/Status";
import Header from "./Header/Header";
import Greeting from "./Header/Greeting";
import Toasts from "./Toasts/Toasts";
import ActivityDetection from "./Status/ActivityDetection";
import StatusToggler from "./Status/StatusToggler";
import TaskForm from "./Projects/Tasks/TaskForm";
import Tasks from "./Projects/Tasks/Tasks";

export default function Dashboard() {
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
      <div>
        <Header />

        <ActivityDetection />
        <Row xs={1} md={1} lg={2} className="g-1 h-80">
          <Col lg="9">
            <Row xs={1} md={1} lg={1} className="g-1">
              <Col>
                <Card className="shadow m-2">
                  <Card.Body>
                    <Row>
                      <Col md="auto">
                        <div className="d-flex justify-content-center mb-2">
                          <Image
                            src={currentUserData.avatar}
                            style={{ height: "8rem", width: "auto" }}
                            roundedCircle
                            thumbnail
                          />
                        </div>
                      </Col>
                      <Col className="text-left d-flex align-items-center justify-content-left">
                        <div>
                          <h2>
                            <Greeting />
                          </h2>
                          <p>
                            {teamData.name}
                            <br />
                            {baseData.name} [+{baseData.code}]
                          </p>
                        </div>
                      </Col>
                      <Col className="text-left d-flex align-items-center justify-content-end">
                        <StatusToggler />
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
              <Row xs={1} md={1} lg={2} className="g-1">
                <Col>
                  <Card text="dark" className="shadow m-2">
                    <Card.Body>
                      <h2 className="text-center mb-4">Your Active Tasks</h2>
                      <Tasks />

                      <br />
                    </Card.Body>
                  </Card>
                </Col>
                <Col>
                  <Card className="shadow m-2">
                    <Card.Body>
                      <h2 className="text-center mb-4">Create Task</h2>
                      {/* <FontAwesomeIcon icon="fa-solid fa-circle-exclamation" />{" "} */}
                      <TaskForm />
                      <br />
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Row>
          </Col>
          <Col lg="3">
            <Status
              auth={(currentUser, currentUserStatus, updateStatus, teamMembers)}
            />
          </Col>
        </Row>
        <Toasts />
      </div>
    </>
  );
}
