import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Badge, Stack, OverlayTrigger, Tooltip } from "react-bootstrap";

export default function VFPDetails() {
  const { currentUserData } = useAuth();

  const values = [
    {
      title: "Realized VFP:",
      value: currentUserData.vfp.realized,
      desc: "Your VFP which is current exchangable for rewards via HR.",
    },
    {
      title: "Unrealized VFP:",
      value: currentUserData.vfp.unrealized,
      desc: "Your VFP earned but pending until the current project is complete.",
    },
    {
      title: "VFP Current Multiplier:",
      value: currentUserData.vfp.multiplier,
      desc: "VFP earned are multiplied by the value below. It is based on appraisal sentiment.",
    },
  ];

  return (
    <div>
      <Stack direction="horizontal" gap={2} className="mt-1">
        {values.map((value) => (
          <OverlayTrigger
            key={`desc-${value.value}`}
            placement="top"
            overlay={<Tooltip id={`tooltip-top`}>{value.desc}</Tooltip>}
          >
            <Badge type="pill">
              {value.title}
              {" " + value.value}
            </Badge>
          </OverlayTrigger>
        ))}
      </Stack>
    </div>
  );
}
