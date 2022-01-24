import React, { useEffect, useState } from "react";
import { useAuth } from "../../../../contexts/AuthContext";

export default function Greeting() {
  const currentHour = new Date().getHours();
  const { currentUserData } = useAuth();

  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    switch (true) {
      case currentHour < 12:
        setGreeting("Good Morning, ");
        break;
      case currentHour < 18:
        setGreeting("Good Afternoon, ");
        break;
      default:
        setGreeting("Good Evening, ");
        break;
    }
  }, []);

  return (
    <>
      <div>
        <h4 className="text-center mb-4">
          {greeting} {currentUserData.fname}!
        </h4>
      </div>
    </>
  );
}
