import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useAuth } from "../../../contexts/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function LogoutButton() {
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
      <Button variant="secondary" onClick={handleLogout}>
        <FontAwesomeIcon icon="fa-solid fa-arrow-right-from-bracket" /> Log Out
      </Button>
    </div>
  );
}
