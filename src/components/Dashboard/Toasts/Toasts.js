import React, { useState } from "react";
import { Toast, ToastContainer } from "react-bootstrap";
import { useAuth } from "../../../contexts/AuthContext";

import Greeting from "../Header/Greeting";

export default function Toasts() {
  const [showA, setShowA] = useState(true);
  const toggleShowA = () => setShowA(!showA);
  const { currentUserStatus } = useAuth();

  return (
    <div className="fixed-bottom m-2">
      <ToastContainer position="bottom-end">
        <Toast show={showA} onClose={toggleShowA}>
          <Toast.Header>
            <img
              src="/logo512d.png"
              className="me-2"
              width="auto"
              height="20"
              alt="favicon"
            />
            <strong className="me-auto">Kore Bot</strong>
            <small>2 mins ago</small>
          </Toast.Header>
          <Toast.Body>
            <strong>
              <Greeting />
            </strong>
            <br />
            You're <strong>{currentUserStatus.status.toLowerCase()}</strong> and
            ready for a productive day of braining.
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
}
