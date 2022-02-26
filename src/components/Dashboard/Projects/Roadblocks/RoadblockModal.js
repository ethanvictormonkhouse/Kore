import React from "react";
import { Modal } from "react-bootstrap";

import RoadblockForm from "./RoadblockForm";

export default function RoadblockModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Heuston, we have a problem!
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        So it seems you've run into an issue. That's not a bother! Fill in some
        details and let's see if your team can help you out.
      </Modal.Body>
      <div className="mx-3 mb-3">
        <RoadblockForm {...props} />
      </div>
    </Modal>
  );
}
