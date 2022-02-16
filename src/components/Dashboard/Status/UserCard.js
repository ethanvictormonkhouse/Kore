import React from "react";
import { Card, Image, Row, Col, Badge, Container } from "react-bootstrap";
import { useAuth } from "../../../contexts/AuthContext";

export default function UserCard(props) {
  const { findUserStatus } = useAuth();

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
      <Container>
        <Card text="dark" className="shadow-sm mb-2">
          <Row xs={1} md={1} lg={2}>
            <Col md="auto">
              <div className="text-center my-2">
                <Image
                  src={props.avatar}
                  style={{ height: "10vh", width: "auto" }}
                  roundedCircle
                  className={
                    "border-" + getStatusStyling(findUserStatus(props.id))
                  }
                  border="5px"
                />
              </div>
            </Col>
            <Col className="text-left d-flex align-items-center justify-content-left">
              <div>
                <h5>
                  {props.fname} {props.lname}
                </h5>
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
      </Container>
    </div>
  );
}
