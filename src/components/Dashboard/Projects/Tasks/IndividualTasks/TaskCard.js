import React from "react";
import { Card, Row, Col, Badge } from "react-bootstrap";
import { useAuth } from "../../../../../contexts/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TimeAgo from "react-timeago";
import TaskOptions from "./TaskOptions";

export default function TaskCard(props) {
  const { findUser } = useAuth();

  return (
    <div>
      <Card text="dark" className="shadow-sm mb-2">
        <Card.Body>
          <Row>
            <Col
              style={{
                textDecoration: props.status === "Complete" && "line-through",
              }}
            >
              <h4>
                <FontAwesomeIcon icon="fa-solid fa-pencil" /> {props.title}
              </h4>
              <p>{props.desc}</p>
              Assigned By:{" "}
              <Badge>
                {findUser(props.created).fname +
                  " " +
                  findUser(props.created).lname}
              </Badge>{" "}
              <br />
              Status: <Badge>{props.status}</Badge>
              <br />
              Created:{" "}
              <Badge>
                <TimeAgo date={props.created_at.seconds * 1000} />
              </Badge>
            </Col>

            <Col md="auto">
              <TaskOptions {...props} />
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
}
