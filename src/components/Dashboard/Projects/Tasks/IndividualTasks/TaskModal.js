import React from "react";
import { Modal } from "react-bootstrap";

import TaskForm from "./TaskForm";

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
      <div className="mx-3 mb-3">
        <TaskForm {...props} />
      </div>
    </Modal>
  );
}
