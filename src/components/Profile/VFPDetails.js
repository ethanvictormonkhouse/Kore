import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Badge, Stack } from "react-bootstrap";

export default function VFPDetails() {
  const { currentUserData } = useAuth();
  return (
    <div>
      <Stack direction="horizontal" gap={2} className="mt-1">
        <Badge type="pill">
          Realized VFP:
          {" " + currentUserData.vfp.realized}
        </Badge>
        <Badge type="pill">
          Unrealized VFP:
          {" " + currentUserData.vfp.unrealized}
        </Badge>
        <Badge type="pill">
          VFP Current Multiplier:
          {" " + currentUserData.vfp.multiplier}
        </Badge>
      </Stack>
    </div>
  );
}
