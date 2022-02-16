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

export default function SolutionForm(props) {
  const solutionRef = useRef();

  const { createSolution } = useAuth();
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);
      await createSolution(
        props.id,
        props.task,
        solutionRef.current.value
      ).then((res) => {
        setResponse("Successfully submitted solution.");
        setLoading(false);
        return res;
      });
    } catch (err) {
      console.log(err.message);
      setResponse("There was an issue submitting your solution.");
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
              <Form.Group className="mb-3">
                <Form.Control
                  type="roadblock"
                  placeholder={props.issue}
                  readOnly
                />
              </Form.Group>
              <Form.Group id="issue">
                <FloatingLabel
                  controlId="issue_input"
                  label="Solution Details"
                  className="mb-3"
                >
                  <Form.Control
                    as="textarea"
                    rows="6"
                    ref={solutionRef}
                    required
                  />
                </FloatingLabel>
              </Form.Group>
              {response && <Alert variant="success">{response}</Alert>}

              <Button
                disabled={loading}
                className="w-100"
                variant="success"
                type="submit"
              >
                <FontAwesomeIcon icon="fa-solid fa-lightbulb" /> Submit Solution
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
