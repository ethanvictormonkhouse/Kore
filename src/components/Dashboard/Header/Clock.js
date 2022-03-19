import React, { useEffect, useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";

function Clock() {
  const [localClock, setLocalClock] = useState();
  const [baseClock, setBaseClock] = useState();
  const [loading, setLoading] = useState(false);
  const { baseData } = useAuth();

  useEffect(() => {
    setLoading(true);
    setInterval(() => {
      const date = new Date();
      const offset = date.getTimezoneOffset();
      setLocalClock(
        date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      );
      date.setMinutes(date.getMinutes() + baseData.tz * 60 + offset);
      setBaseClock(
        date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      );
    }, 1000);
    return () => {
      setLoading(false);
    };
  }, []);

  return (
    <div style={{ fontSize: "12px", margin: "0px" }}>
      Local Time: <strong>{localClock} </strong>
      {Intl.DateTimeFormat().resolvedOptions().timeZone} <br />
      Base: <strong>{baseClock} </strong>
      {baseData.country} [{baseData.region}]
    </div>
  );
}

export default Clock;
