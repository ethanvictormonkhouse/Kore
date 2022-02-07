import React, { useState, useEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../../services/firebase";
import { useAuth } from "../../../../contexts/AuthContext";
import TaskCard from "./TaskCard";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    let unsubscribed = false;

    const q = query(
      collection(db, "tasks"),
      where("assigned_to", "==", currentUser.uid)
    );

    getDocs(q)
      .then((querySnapshot) => {
        if (unsubscribed) return; // unsubscribed? do nothing.

        const taskArray = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        setTasks(taskArray);
      })
      .catch((err) => {
        if (unsubscribed) return; // unsubscribed? do nothing.

        // TODO: Handle errors
        console.error("Failed to retrieve data", err);
      });

    return () => (unsubscribed = true);
  }, []);
  return (
    <div>
      {tasks.map((task) => (
        <TaskCard
          id={task.id}
          key={task.id}
          title={task.title}
          desc={task.desc}
          created={task.created_by}
        />
      ))}
    </div>
  );
}
