import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Card, Row, Col, Image } from "react-bootstrap";

import Greeting from "../Dashboard/Header/Greeting";
import VFPDetails from "./VFPDetails";
import StatusToggler from "../Dashboard/Status/StatusToggler";

export default function ProfileInformation() {
  const { currentUserData, teamData, baseData } = useAuth();
  return (
    <div>
      <Col>
        <Card
          className="shadow overflow-auto"
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
                  </p>
                  <VFPDetails />
                </div>
              </Col>
              <Col className="text-left d-flex align-items-center justify-content-end">
                <StatusToggler />
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>
    </div>
  );
}
