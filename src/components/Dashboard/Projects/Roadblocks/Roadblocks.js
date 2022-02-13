import React, { useState, useEffect } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../../../../services/firebase";
import RoadblockCard from "./RoadblockCard";

export default function Roadblocks() {
  const [loading, setLoading] = useState(false);
  const [roadblocks, setRoadblocks] = useState([]);

  useEffect(() => {
    setLoading(true);

    const q = query(
      collection(db, "roadblocks"),
      where("status", "==", "Open")
    );

    onSnapshot(q, (querySnapshot) => {
      if (!querySnapshot) return;
      const roadblocks = [];
      querySnapshot.forEach((doc) =>
        roadblocks.push({
          ...doc.data(),
          id: doc.id,
        })
      );
      setRoadblocks(roadblocks);
    });

    return () => {
      setLoading(false);
    };
  }, []);

  return (
    <div>
      {roadblocks.map((roadblock) => (
        <RoadblockCard
          id={roadblock.id}
          key={roadblock.id}
          title={roadblock.title}
          task={roadblock.task}
          issue={roadblock.issue}
          status={roadblock.status}
          created={roadblock.created_by}
        />
      ))}
    </div>
  );
}
