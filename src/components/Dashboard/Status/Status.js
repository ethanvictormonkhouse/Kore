import React from "react";
import {
  Card,
  Container,
  ButtonGroup,
  ToggleButton,
  Button,
  CardGroup,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth } from "../../../contexts/AuthContext";

export default function Status() {
  const {
    currentUser,
    currentUserStatus,
    teamData,
    updateStatus,
    teamMembers,
  } = useAuth();

  // function teamMemberStatus() {
  //   getStatus("Lxc9HpV3c4fYeb1cvaguNmgGlSg1").then((res) => {
  //     return res;
  //   });
  // }

  // function getStatus(user) {
  //   return get(ref(rtdb, "users/" + user))
  //     .then((snapshot) => {
  //       if (snapshot.exists()) {
  //         return snapshot.val().status;
  //       } else {
  //         return "Offline";
  //       }
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }

  const statuses = [
    {
      name: "Available",
      variant: "outline-success",
      icon: "fa-solid fa-circle-check",
    },
    {
      name: "Busy",
      variant: "outline-danger",
      icon: "fa-solid fa-circle-xmark",
    },
    { name: "In A Call", variant: "outline-danger", icon: "fa-solid fa-phone" },
    {
      name: "On A Break",
      variant: "outline-success",
      icon: "fa-solid fa-mug-saucer",
    },
    { name: "Away", variant: "outline-dark", icon: "fa-solid fa-moon" },
  ];

  return (
    <div>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Your Status</h2>
          <p className="text-center mb-2">
            You've been working on <strong>'Front-End'</strong> for{" "}
            <strong>87 minutes</strong>. Maybe take a break?{" "}
          </p>
        </Card.Body>
        <Container className="d-flex justify-content-center mb-3">
          <ButtonGroup>
            {statuses.map((status) => (
              <ToggleButton
                key={status.name}
                id={`status-${status.name}`}
                type="radio"
                variant={status.variant}
                value={status.name}
                checked={currentUserStatus.status === status.name}
                onChange={(e) =>
                  updateStatus(currentUser.uid, e.target.value, "")
                }
              >
                <FontAwesomeIcon icon={status.icon} /> {status.name}
              </ToggleButton>
            ))}
          </ButtonGroup>
        </Container>
        <Card className="m-2">
          <h3 className="text-center mt-4">{teamData.name} Team</h3>
          <Card.Body>
            <CardGroup>
              {teamMembers.map((member) => (
                <Card
                  key={`member-${member.id}`}
                  className="m-2"
                  style={{ width: "15rem" }}
                >
                  <Card.Body>
                    <Card.Title>
                      {member.data().fname} {member.data().lname}
                    </Card.Title>
                    <Card.Text></Card.Text>
                    <Button variant="primary">View Profile</Button>
                  </Card.Body>
                </Card>
              ))}
            </CardGroup>
          </Card.Body>
        </Card>
      </Card>
    </div>
  );
}
