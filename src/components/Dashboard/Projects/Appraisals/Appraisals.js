import React, { useState, useEffect } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../../../../services/firebase";
import { useAuth } from "../../../../contexts/AuthContext";

import AppraisalsCard from "./AppraisalsCard";

export default function Appraisals() {
  const [loading, setLoading] = useState(false);
  const [appraisals, setAppraisals] = useState([]);
  const { currentUser, currentUserData } = useAuth();

  useEffect(() => {
    setLoading(true);
    const q = query(
      collection(db, "tasks"),
      where("team", "==", currentUserData.team),
      where("status", "==", "Complete"),
      where("assigned_to", "!=", currentUser.uid)
    );

    onSnapshot(q, (querySnapshot) => {
      if (!querySnapshot) return;
      const appraisals = [];
      querySnapshot.forEach((doc) =>
        appraisals.push({
          ...doc.data(),
          id: doc.id,
        })
      );
      setAppraisals(appraisals);
    });

    return () => {
      setLoading(false);
    };
  }, []);

  return (
    <div>
      {appraisals.map((roadblock) => (
        <AppraisalsCard
          id={roadblock.id}
          key={roadblock.id}
          title={roadblock.title}
          task={roadblock.task}
          issue={roadblock.issue}
          status={roadblock.status}
          assigned={roadblock.assigned_to}
        />
      ))}
    </div>
  );
}
