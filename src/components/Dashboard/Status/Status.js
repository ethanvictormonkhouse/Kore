import React from "react";
import { Card, Row } from "react-bootstrap";

import { useAuth } from "../../../contexts/AuthContext";

import StatusText from "./StatusText";
import UserCard from "./UserCard";

export default function Status() {
  const { teamMembers } = useAuth();

  return (
    <div>
      <Card className="shadow m-2">
        <Card.Body>
          <h2 className="text-center mb-2">
            Your <strong>Status</strong>
          </h2>
        </Card.Body>
        <StatusText />
        <Card.Body>
          <Row xs={1} md={1} lg={1} className="g-2">
            {teamMembers.map((member) => (
              <UserCard
                id={member.id}
                key={member.id}
                fname={member.data().fname}
                lname={member.data().lname}
                avatar={member.data().avatar}
              />
            ))}
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
}
