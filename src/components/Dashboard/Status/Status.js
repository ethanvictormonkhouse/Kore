import React from "react";
import { Card } from "react-bootstrap";
import Clock from "../Header/Clock";

export default function Status() {
  return (
    <div>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Your Status</h2>
          You've been working on <strong>'Front-End'</strong> for{" "}
          <strong>87 minutes</strong>. Maybe take a break?{" "}
        </Card.Body>
      </Card>
    </div>
  );
}
