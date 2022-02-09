import React, { useRef, useState } from "react";
import { Form, Button, Card, FloatingLabel, Spinner } from "react-bootstrap";

import { useAuth } from "../../../../contexts/AuthContext";

export default function TaskForm() {
  const titleRef = useRef();
  const descRef = useRef();
  const assignedRef = useRef();

  const { createTask, teamMembers } = useAuth();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setLoading(true);
      await createTask(
        titleRef.current.value,
        descRef.current.value,
        "Not Started",
        assignedRef.current.value
      ).then((res) => {
        setLoading(false);
        return res;
      });
    } catch (err) {
      console.log(err.message);
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
              <Form.Group id="title">
                <FloatingLabel
                  controlId="title_input"
                  label="Task"
                  className="mb-3"
                >
                  <Form.Control type="text" ref={titleRef} required />
                </FloatingLabel>
              </Form.Group>
              <Form.Group id="desc">
                <FloatingLabel
                  controlId="desc_input"
                  label="Additional Details"
                  className="mb-3"
                >
                  <Form.Control as="textarea" ref={descRef} required rows={3} />
                </FloatingLabel>
              </Form.Group>
              <Form.Group className="mt-2">
                <FloatingLabel
                  controlId="assign_to"
                  label="Assign To"
                  className="mb-3"
                >
                  <Form.Select
                    aria-label="select-member"
                    ref={assignedRef}
                    required
                  >
                    {teamMembers.map((member, i) => (
                      <option key={i} value={member.id}>
                        {member.data().fname} {member.data().lname}
                      </option>
                    ))}
                  </Form.Select>
                </FloatingLabel>
              </Form.Group>
              <Button disabled={loading} className="w-100 mt-3" type="submit">
                Create Task &nbsp;
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
