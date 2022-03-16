import React, { useState, useEffect } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../../../../services/firebase";
import { useAuth } from "../../../../contexts/AuthContext";
import AppraisalCard from "./AppraisalCard";

export default function Appraisals() {
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    setLoading(true);

    const q = query(
      //use composite index in firebase to search
      collection(db, "appraisals"),
      where("given_to", "==", currentUser.uid)
    );

    onSnapshot(q, (querySnapshot) => {
      if (!querySnapshot) return;
      const tasks = [];
      querySnapshot.forEach((doc) =>
        tasks.push({
          ...doc.data(),
          id: doc.id,
        })
      );
      setTasks(tasks);
    });

    return () => {
      setLoading(false);
    };
  }, []);

  return (
    <div>
      {tasks.map((task) => (
        <AppraisalCard
          id={task.id}
          key={task.id}
          type={task.type}
          task={task.task_title}
          comment={task.comment}
          created={task.created_by}
          created_at={task.created_at}
        />
      ))}
    </div>
  );
}
