import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useAuth } from "../../../../contexts/AuthContext";

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
    <div className="w-100 text-center mt-2">
      <Button variant="primary" onClick={handleLogout}>
        Log Out
      </Button>
    </div>
  );
}
