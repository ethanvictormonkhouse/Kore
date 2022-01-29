import React from "react";
import { useAuth } from "../../../contexts/AuthContext";
import TimeAgo from "react-timeago";

function StatusText() {
  const { currentUserStatus } = useAuth();

  return (
    <div>
      <p className="text-center mb-2">
        You changed your status to{" "}
        <i>'{currentUserStatus.status.toLowerCase()}'</i>{" "}
        <strong>
          <TimeAgo date={currentUserStatus.updated} />
        </strong>
        .
      </p>
    </div>
  );
}

export default StatusText;
