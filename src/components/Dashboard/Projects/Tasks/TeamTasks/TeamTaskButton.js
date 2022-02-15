import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import TeamTaskModal from "./TeamTaskModal";

export default function TeamTaskButton(props) {
  const [modalShow, setModalShow] = useState(false);
  return (
    <div>
      <Button onClick={() => setModalShow(true)} variant="secondary">
        <FontAwesomeIcon icon="fa-solid fa-comment" />
      </Button>

      <TeamTaskModal
        {...props}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </div>
  );
}
