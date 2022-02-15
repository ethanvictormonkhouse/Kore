import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import TaskModal from "./TaskModal";

export default function TaskButton(props) {
  const [modalShow, setModalShow] = useState(false);
  return (
    <div>
      <div className="d-grid mt-3">
        <Button onClick={() => setModalShow(true)} variant="primary" size="lg">
          <FontAwesomeIcon icon="fa-solid fa-add" /> New Task
        </Button>
      </div>
      <TaskModal
        {...props}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </div>
  );
}
