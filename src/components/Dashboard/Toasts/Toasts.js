import React, { useState } from "react";
import { Toast, ToastContainer } from "react-bootstrap";

export default function Toasts() {
  const [showA, setShowA] = useState(true);
  const toggleShowA = () => setShowA(!showA);

  return (
    <div>
      <ToastContainer position="bottom-end" className="p-3">
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
            Good morning, Ethan! You're <strong>online</strong> and ready for a
            productive day of braining.
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
}
