import React from "react";
import { Card, Row, Col, Container } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";

import Status from "./Status/Status";
import Header from "./Header/Header";
import Toasts from "./Toasts/Toasts";
import ActivityDetection from "./Status/ActivityDetection";
import Tasks from "./Projects/Tasks/IndividualTasks/Tasks";
import TaskButton from "./Projects/Tasks/IndividualTasks/TaskButton";
import Roadblocks from "../Dashboard/Projects/Roadblocks/Roadblocks";
import TeamTasks from "./Projects/Tasks/TeamTasks/TeamTasks";
import Appraisals from "./Projects/Appraisals/Appraisals";
import ProfileInformation from "../Profile/ProfileInformation";
import StatusText from "./Status/StatusText";

export default function Dashboard() {
  const { currentUser, currentUserStatus, updateStatus, teamMembers } =
    useAuth();

  return (
    <>
      <div>
        <ActivityDetection />
        <Header />
        <Container fluid className="m-0 p-0 ">
          <Row
            style={{
              margin: "1vh",
            }}
          >
            <Col xs={9} md={9}>
              <Row>
                <ProfileInformation />
              </Row>
              <Row>
                <Col>
                  <Card
                    className="shadow"
                    style={{
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
                style={{ height: "84vh", width: "auto" }}
              >
                <Card.Header>
                  <h2 className="text-center mt-1 mb-3">
                    Your <strong>Status</strong>
                  </h2>
                  <StatusText />
                </Card.Header>
                <Card.Body className="overflow-auto">
                  <Status
                    auth={
                      (currentUser,
                      currentUserStatus,
                      updateStatus,
                      teamMembers)
                    }
                  />
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
        <Toasts />
      </div>
    </>
  );
}
