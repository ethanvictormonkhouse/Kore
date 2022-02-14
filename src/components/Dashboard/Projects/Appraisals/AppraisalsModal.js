import React from "react";
import { Button, Modal } from "react-bootstrap";
import { useAuth } from "../../../../contexts/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import AppraisalsForm from "./AppraisalsForm";

export default function AppraisalsModal(props) {
  const { findUser } = useAuth();

  return (
    <div>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <FontAwesomeIcon icon="fa-solid fa-pen-to-square" /> Submit
            Appraisal for {findUser(props.assigned).fname}
          </Modal.Title>
        </Modal.Header>
        <div className="m-3">
          <AppraisalsForm {...props} />
        </div>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
