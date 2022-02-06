import React from "react";
import { useAuth } from "../../../contexts/AuthContext";
import TimeAgo from "react-timeago";
import { Badge } from "react-bootstrap";

function StatusText() {
  const { currentUserStatus } = useAuth();

  return (
    <div className="d-flex mb-2 justify-content-center">
      <div>
        <Badge pill bg="primary">
          <TimeAgo date={currentUserStatus.updated} />
        </Badge>
      </div>
    </div>
  );
}

export default StatusText;
