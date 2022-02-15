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
          <Row>
            <Col xs={12} md={9}>
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
              <Container fluid className="m-0 p-0">
                <Row xs={2} md={2} lg={2}>
                  <Col>
                    <Card text="dark" className="shadow m-2">
                      <Card.Body>
                        <div>
                          <h2 className="text-center mb-4">
                            Your Active <strong>Tasks</strong>
                          </h2>
                        </div>
                        <div className="overflow-hidden">
                          <Tasks />
                        </div>
                        <TaskButton />
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col>
                    <Card className="shadow m-2">
                      <Card.Body>
                        <h2 className="text-center mb-4">
                          Recently <strong>Completed (All)</strong>
                        </h2>

                        <div className="overflow-hidden">
                          <TeamTasks />
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col>
                    <Card className="shadow m-2">
                      <Card.Body>
                        <h2 className="text-center mb-4">
                          Open <strong>Roadblocks</strong>
                        </h2>
                        <div className="overflow-hidden">
                          <Roadblocks />
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col>
                    <Card className="shadow m-2">
                      <Card.Body>
                        <h2 className="text-center mb-4">
                          Your <strong>Appraisals</strong>
                        </h2>
                        <div className="overflow-hidden">
                          <Appraisals />
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </Container>
            </Col>
            <Col xs={6} md={3}>
              <Status
                auth={
                  (currentUser, currentUserStatus, updateStatus, teamMembers)
                }
              />
            </Col>
          </Row>
        </Container>
        <Toasts />
      </div>
    </>
  );
}
