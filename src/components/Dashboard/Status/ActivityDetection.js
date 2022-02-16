import { useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { useIdleTimer } from "react-idle-timer";

export default function ActivityDetection() {
  const [lastStatus, setLastStatus] = useState("Available");
  const timeOutMins = 1;
  const { currentUser, currentUserStatus, updateStatus } = useAuth();
  if (Notification.permission !== "granted") Notification.requestPermission();

  function showNotification() {
    if (!("Notification" in window)) {
      console.log("This browser does not support desktop notification");
    } else if (Notification.permission === "granted") {
      new Notification("You still there? Status set to 'Away'", {
        body: "You've been inactive for a while. We've changed your status to 'Away'",
      });
    } else {
      Notification.requestPermission();
    }
  }

  const handleOnIdle = (event) => {
    showNotification();
    setLastStatus(currentUserStatus.status); //store current status
    updateStatus(currentUser.uid, "Away", ""); //update status to away
  };

  const handleOnActive = (event) => {
    if (lastStatus === "Busy") updateStatus(currentUser.uid, "Busy", "");
    //if last status was busy, set to busy
    else updateStatus(currentUser.uid, "Available", ""); //else set to available'
  };

  useIdleTimer({
    timeout: timeOutMins * 60 * 1000,
    onIdle: handleOnIdle,
    onActive: handleOnActive,
    debounce: 500,
  });

  return <div></div>;
}
