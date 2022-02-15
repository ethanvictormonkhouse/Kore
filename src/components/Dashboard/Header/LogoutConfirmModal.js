import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useAuth } from "../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function LogoutConfirmModal(props) {
  const [error, setError] = useState("");
  const { logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    setError("");
    try {
      await logout();
      navigate("/login");
    } catch {
      setError("Failed to log out");
      console.log(error);
    }
  }
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
            Ready to call it a day?
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          By logging out, all data used to identify your online presence and
          activity will be <strong>removed immediately</strong>. Kore{" "}
          <strong>does not</strong> store this information.
          <br />
          <br />
          <h5>
            Please <strong>confirm</strong> you would like to{" "}
            <strong>log out</strong> from Kore.
          </h5>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleLogout}>
            <FontAwesomeIcon icon="fa-solid fa-arrow-right-from-bracket" />{" "}
            Confirm Log Out
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
