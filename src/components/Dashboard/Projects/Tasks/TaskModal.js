import React from "react";
import { Button, Modal } from "react-bootstrap";

import TaskForm from "../Tasks/TaskForm";

export default function TaskModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">New Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Let's get working! Fill in the detail below, and assign it to a team
        member.
      </Modal.Body>
      <div className="m-3">
        <TaskForm {...props} />
      </div>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
