import React from "react";
import { Card, Row, Col, Image, Container } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";

import Status from "./Status/Status";
import Header from "./Header/Header";
import Greeting from "./Header/Greeting";
import Toasts from "./Toasts/Toasts";
import ActivityDetection from "./Status/ActivityDetection";
import StatusToggler from "./Status/StatusToggler";
import Tasks from "./Projects/Tasks/IndividualTasks/Tasks";
import TaskButton from "./Projects/Tasks/IndividualTasks/TaskButton";
import Roadblocks from "../Dashboard/Projects/Roadblocks/Roadblocks";
import TeamTasks from "./Projects/Tasks/TeamTasks/TeamTasks";
import VFPDetails from "../Profile/VFPDetails";
import Appraisals from "./Projects/Appraisals/Appraisals";

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
        <ActivityDetection />
        <Header />
        <Container fluid className="m-0 p-0">
          <Row
            style={{
              margin: "1vh",
            }}
          >
            <Col xs={9} md={9}>
              <Row>
                <Col>
                  <Card
                    className="shadow"
                    style={{
                      margin: "0 0 2vh 0",
                      height: "20vh",
                      width: "auto",
                    }}
                  >
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
                              <br />
                              <VFPDetails />
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
              </Row>
              <Row>
                <Col>
                  <Card
                    className="shadow"
                    style={{
                      margin: "0 0 2vh 0",
                      height: "62vh",
                    }}
                  >
                    <Card.Header>
                      <h2 className="text-center m-0">
                        Your Active <strong>Tasks</strong>
                      </h2>
                    </Card.Header>
                    <Card.Body className="overflow-auto">
                      <Tasks />
                    </Card.Body>
                    <Card.Footer className="pb-4">
                      <TaskButton />
                      <Roadblocks />
                    </Card.Footer>
                  </Card>
                </Col>
                <Col>
                  <Card
                    className="shadow"
                    style={{
                      margin: "0 0 2vh 0",
                      height: "62vh",
                      width: "auto",
                    }}
                  >
                    <Card.Header>
                      <h2 className="text-center m-0">
                        Your <strong>Appraisals</strong>
                      </h2>
                    </Card.Header>
                    <Card.Body className="overflow-auto">
                      <Appraisals />
                    </Card.Body>
                    <Card.Footer className="pb-4">
                      <TeamTasks />
                    </Card.Footer>
                  </Card>
                </Col>
              </Row>
            </Col>
            <Col xs={3} md={3}>
              <Card
                className="shadow"
                style={{ margin: "0 0 2vh 0", height: "84vh", width: "auto" }}
              >
                <Status
                  auth={
                    (currentUser, currentUserStatus, updateStatus, teamMembers)
                  }
                />
              </Card>
            </Col>
          </Row>
        </Container>
        <Toasts />
      </div>
    </>
  );
}
