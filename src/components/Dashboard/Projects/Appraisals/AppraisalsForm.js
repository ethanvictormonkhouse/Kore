import React, { useRef, useState } from "react";
import {
  Form,
  Button,
  Card,
  FloatingLabel,
  Spinner,
  Alert,
  ButtonGroup,
  ToggleButton,
  Row,
  Col,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useAuth } from "../../../../contexts/AuthContext";

export default function AppraisalsForm(props) {
  const issueRef = useRef();
  const { createRoadblock } = useAuth();

  const appraisals = [
    {
      type: "positive",
      points: "3",
      variant: "success",
      icon: "fa-solid fa-thumbs-up",
      emotion: "fa-regular fa-face-grin-stars",
    },
    {
      type: "negative",
      points: "3",
      variant: "danger",
      icon: "fa-solid fa-thumbs-down",
      emotion: "fa-regular fa-face-surprise",
    },
  ];

  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");
  const [appraisalType, setAppraisalType] = useState(appraisals[0]);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setLoading(true);

      await createRoadblock(
        props.id,
        props.title,
        issueRef.current.value,
        "Open"
      ).then((res) => {
        setResponse("Successfully submitted roadblock.");
        setLoading(false);
        return res;
      });
    } catch (err) {
      console.log(err.message);
      setResponse("There was an issue submitting your roadblock.");
      setLoading(false);
      return err.message;
    }
  }

  return (
    <>
      <div className="w-100">
        <Card text="dark">
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Control
                  controlId="task"
                  type="text"
                  placeholder={props.title}
                  readOnly
                />
              </Form.Group>
              <Form.Group id="issue">
                <FloatingLabel
                  controlId="issue_input"
                  label="Comments"
                  className="mb-3"
                >
                  <Form.Control
                    as="textarea"
                    rows="6"
                    ref={issueRef}
                    required
                  />
                </FloatingLabel>
              </Form.Group>
              {response && <Alert variant="success">{response}</Alert>}

              <Row>
                <Col md="auto">
                  <ButtonGroup className="shadow">
                    {appraisals.map((appraisal) => (
                      <ToggleButton
                        key={appraisal.type}
                        id={`status-${appraisal.type}`}
                        type="radio"
                        variant={`outline-${appraisal.variant}`}
                        value={appraisal.type}
                        checked={appraisalType.type === appraisal.type}
                        onChange={(e) => setAppraisalType(appraisal)}
                      >
                        <FontAwesomeIcon icon={appraisal.icon} />
                      </ToggleButton>
                    ))}
                  </ButtonGroup>
                </Col>
                <Col>
                  <Button
                    disabled={loading}
                    className="w-100"
                    variant={appraisalType.variant}
                    type="submit"
                  >
                    <FontAwesomeIcon icon={appraisalType.emotion} /> Submit
                    Appraisal &nbsp;
                    <Spinner
                      as="span"
                      animation="grow"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                      hidden={!loading}
                    />
                  </Button>
                </Col>
              </Row>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}
