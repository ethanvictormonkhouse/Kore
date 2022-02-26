import React, { useRef, useState } from "react";
import {
  Form,
  Button,
  Card,
  FloatingLabel,
  Spinner,
  Alert,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useAuth } from "../../../../contexts/AuthContext";

export default function RoadblockForm(props) {
  const issueRef = useRef();

  const { createRoadblock } = useAuth();
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");

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
        setResponse({
          desc: "Successfully submitted roadblock!",
          variant: "success",
        });
        setLoading(false);
        return res;
      });
    } catch (err) {
      console.log(err.message);
      setResponse({ desc: "Oh no! There's been an error", variant: "danger" });
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
                <Form.Control type="text" placeholder={props.title} readOnly />
              </Form.Group>
              <Form.Group id="issue">
                <FloatingLabel
                  controlId="issue_input"
                  label="Roadblock Details"
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
              {response && (
                <Alert variant={response.variant}>{response.desc}</Alert>
              )}

              <Button
                disabled={loading}
                className="w-100"
                variant="warning"
                type="submit"
              >
                <FontAwesomeIcon icon="fa-solid fa-tools" /> Submit Roadblock
                &nbsp;
                <Spinner
                  as="span"
                  animation="grow"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  hidden={!loading}
                />
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}
