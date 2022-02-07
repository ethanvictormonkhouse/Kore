import React from "react";
import { Card, Col, Badge } from "react-bootstrap";
import { useAuth } from "../../../../contexts/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function TaskCard(props) {
  const { teamMembers, currentUser } = useAuth();

  function findMember(user) {
    if (currentUser) return teamMembers.find((element) => element.id === user);
    else return "User Not Found";
  }

  return (
    <div>
      <Card text="dark" className="shadow-sm mb-2">
        <Col className="text-left d-flex align-items-center justify-content-left">
          <div>
            <Card.Body>
              <FontAwesomeIcon icon="fa-solid fa-pencil" /> {props.title}{" "}
              {props.desc}
              <br />
              Assigned By:{" "}
              <Badge>
                {findMember(props.created).data().fname +
                  " " +
                  findMember(props.created).data().lname}
              </Badge>
            </Card.Body>
          </div>
        </Col>
      </Card>
    </div>
  );
}
