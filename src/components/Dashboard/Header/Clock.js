import React, { useEffect, useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";

function Clock() {
  const [clockState, setClockState] = useState();
  const [loading, setLoading] = useState(false);
  const { baseData } = useAuth();

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

  return (
    <div style={{ fontSize: "12px", margin: "0px" }}>
      Local Time: <strong>{clockState}</strong> <br />
      Base: <strong>{baseData.country}</strong> {baseData.region} UTC[
      {baseData.tz}]
    </div>
  );
}

export default Clock;
