import React, { useState, useEffect } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../../../../services/firebase";
import RoadblockCard from "./RoadblockCard";
import { Button, Modal } from "react-bootstrap";

export default function Roadblocks(props) {
  const [loading, setLoading] = useState(false);
  const [roadblocks, setRoadblocks] = useState([]);
  const [modalShow, setModalShow] = useState(false);

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
      <div className="d-grid mt-3">
        <Button
          onClick={() => setModalShow(true)}
          variant="secondary"
          size="md"
        >
          Open Roadblocks
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
            Open Roadblocks
          </Modal.Title>
        </Modal.Header>

        <div className="m-3">
          {roadblocks.map((roadblock) => (
            <RoadblockCard
              id={roadblock.id}
              key={roadblock.id}
              task={roadblock.task_id}
              title={roadblock.task_title}
              issue={roadblock.issue}
              status={roadblock.status}
              created={roadblock.created_by}
            />
          ))}
        </div>
      </Modal>
    </div>
  );
}
