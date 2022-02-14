import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import AppraisalsModal from "./AppraisalsModal";

export default function AppraisalsButton(props) {
  const [modalShow, setModalShow] = useState(false);
  return (
    <div>
      <Button onClick={() => setModalShow(true)} variant="secondary">
        <FontAwesomeIcon icon="fa-solid fa-comment" />
      </Button>

      <AppraisalsModal
        {...props}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </div>
  );
}
