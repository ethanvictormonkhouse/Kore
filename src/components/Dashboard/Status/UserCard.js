import React from "react";
import { Card, Image, Row, Col, Badge } from "react-bootstrap";
import { useAuth } from "../../../contexts/AuthContext";

export default function UserCard(props) {
  const { userPresence } = useAuth();

  function findUserStatus(user) {
    if (userPresence && userPresence[user]) return userPresence[user].status;
    else return "Offline";
  }

  function getStatusStyling(status) {
    switch (status) {
      case "Available":
        return "success";
      case "On A Break":
        return "success";
      case "Busy":
        return "danger";
      case "In A Call":
        return "danger";
      default:
        return "dark";
    }
  }
  return (
    <div>
      <Card text="dark" className="shadow-sm m-1">
        <Row xs={1} md={1} lg={2} className="g-1">
          <Col>
            <Card.Body>
              <div className="text-center">
                <Image
                  src={props.avatar}
                  style={{ height: "auto", width: "60%" }}
                  roundedCircle
                  className={
                    "border-" + getStatusStyling(findUserStatus(props.id))
                  }
                  border="5px"
                />
              </div>
            </Card.Body>
          </Col>
          <Col className="text-left d-flex align-items-center justify-content-left">
            <div>
              <Card.Title>
                {props.fname} {props.lname}
              </Card.Title>
              <Badge
                pill
                className="text-center"
                bg={getStatusStyling(findUserStatus(props.id))}
              >
                {findUserStatus(props.id)}
              </Badge>
              <br />
            </div>
          </Col>
        </Row>
      </Card>
    </div>
  );
}
