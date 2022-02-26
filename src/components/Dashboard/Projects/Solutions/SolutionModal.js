import React from "react";
import { Modal } from "react-bootstrap";
import { useAuth } from "../../../../contexts/AuthContext";

import SolutionForm from "./SolutionForm";

export default function SolutionModal(props) {
  const { currentUserData, findUser } = useAuth();
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Had a lightbulb moment, {currentUserData.fname}?
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Nice one! We bet {findUser(props.created).fname} would love to know your
        potential solution. Let them know below by completing the solution
        submission below.
      </Modal.Body>
      <div className="mx-3 mb-3">
        <SolutionForm {...props} />
      </div>
    </Modal>
  );
}
