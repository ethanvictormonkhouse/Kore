import { useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { useIdleTimer } from "react-idle-timer";

export default function ActivityDetection() {
  const [lastStatus, setLastStatus] = useState("Available");
  const timeOutMins = 1;
  const { currentUser, currentUserStatus, updateStatus } = useAuth();

  const handleOnIdle = (event) => {
    setLastStatus(currentUserStatus.status); //store current status
    updateStatus(currentUser.uid, "Away", ""); //update status to away
  };

  const handleOnActive = (event) => {
    if (lastStatus === "Busy") updateStatus(currentUser.uid, "Busy", "");
    //if last status was busy, set to busy
    else updateStatus(currentUser.uid, "Available", ""); //else set to available'
  };

  useIdleTimer({
    timeout: timeOutMins * 1000 * 60,
    onIdle: handleOnIdle,
    onActive: handleOnActive,
    debounce: 500,
  });

  return <div></div>;
}
