import React, { useEffect, useState } from "react";

function Clock() {
  const [clockState, setClockState] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setInterval(() => {
      const date = new Date();
      setClockState(date.toLocaleTimeString());
    }, 1000);
    return () => {
      setLoading(false);
    };
  }, []);

  return <div style={{ fontSize: "25px", margin: "0px" }}>{clockState}</div>;
}

export default Clock;
