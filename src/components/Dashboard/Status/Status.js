import React from "react";
import { Row } from "react-bootstrap";
import { useAuth } from "../../../contexts/AuthContext";

import UserCard from "./UserCard";

export default function Status() {
  const { teamMembers } = useAuth();

  return (
    <div>
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
    </div>
  );
}
