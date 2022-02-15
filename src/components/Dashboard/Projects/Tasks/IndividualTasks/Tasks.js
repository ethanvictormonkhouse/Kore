import React, { useState, useEffect } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../../../../../services/firebase";
import { useAuth } from "../../../../../contexts/AuthContext";
import TaskCard from "./TaskCard";

export default function Tasks() {
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    setLoading(true);

    const q = query(
      //use composite index in firebase to search
      collection(db, "tasks"),
      where("assigned_to", "==", currentUser.uid),
      where("status", "!=", "Complete")
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
        <TaskCard
          id={task.id}
          key={task.id}
          title={task.title}
          desc={task.desc}
          status={task.status}
          created={task.created_by}
        />
      ))}
    </div>
  );
}
