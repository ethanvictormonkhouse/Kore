import React from "react";
import { Link } from "react-router-dom";

export default function UpdateProfile() {
  return (
    <div className="w-100 text-center mt-2">
      <Link to="/update-profile" className="btn btn-primary">
        Update Profile
      </Link>
    </div>
  );
}
