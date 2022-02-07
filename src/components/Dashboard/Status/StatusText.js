import React from "react";
import { useAuth } from "../../../contexts/AuthContext";
import TimeAgo from "react-timeago";
import { Badge } from "react-bootstrap";

function StatusText() {
  const { currentUserStatus } = useAuth();

  return (
    <div className="d-flex text-center justify-content-center">
      <p>
        Your status is currently set to{" "}
        <strong>'{currentUserStatus.status.toLowerCase()}'</strong>.
        <br />
        <Badge className="mt-2">
          <TimeAgo date={currentUserStatus.updated} />
        </Badge>
      </p>
    </div>
  );
}

export default StatusText;
