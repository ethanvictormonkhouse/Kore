import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LogoutConfirmModal from "./LogoutConfirmModal";

export default function LogoutButton() {
  const [modalShow, setModalShow] = useState(false);

  return (
    <div>
      <Button variant="secondary" onClick={() => setModalShow(true)}>
        <FontAwesomeIcon icon="fa-solid fa-arrow-right-from-bracket" /> Log Out
      </Button>
      <LogoutConfirmModal show={modalShow} onHide={() => setModalShow(false)} />
    </div>
  );
}
