import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function UpdateProfile() {
  return (
    <div className="w-100 text-center">
      <Link to="/update-profile" className="btn btn-primary">
        <FontAwesomeIcon icon="fa-solid fa-id-card" /> Update Profile
      </Link>
    </div>
  );
}
