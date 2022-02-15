import React, { useState, useEffect } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../../../../../services/firebase";
import { Button, Modal } from "react-bootstrap";

import { useAuth } from "../../../../../contexts/AuthContext";

import TeamTaskCard from "./TeamTaskCard";

export default function TeamTasks() {
  const [loading, setLoading] = useState(false);
  const [appraisals, setAppraisals] = useState([]);
  const [modalShow, setModalShow] = useState(false);
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
      <div className="d-grid mt-3">
        <Button
          onClick={() => setModalShow(true)}
          variant="outline-primary"
          size="md"
        >
          Appraise Team Member
        </Button>
      </div>
      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Select A Task To Appraise
          </Modal.Title>
        </Modal.Header>

        <div className="m-3">
          {appraisals.map((appraisal) => (
            <TeamTaskCard
              id={appraisal.id}
              key={appraisal.id}
              title={appraisal.title}
              task={appraisal.task}
              issue={appraisal.issue}
              status={appraisal.status}
              assigned={appraisal.assigned_to}
            />
          ))}
        </div>
      </Modal>
    </div>
  );
}
