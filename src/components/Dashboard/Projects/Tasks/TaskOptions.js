import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../../services/firebase";
import { Button } from "react-bootstrap";

import RoadblockModal from "./RoadblockModal";

export default function TaskOptions(props) {
  const [modalShow, setModalShow] = useState(false);

  const handleRemove = async () => {
    await deleteDoc(doc(db, "tasks", props.id));
  };
  const handleComplete = async () => {
    await updateDoc(doc(db, "tasks", props.id), { status: "Complete" });
  };

  return (
    <div className="d-grid gap-3">
      <Button onClick={() => setModalShow(true)} variant="warning" size="sm">
        <FontAwesomeIcon icon="fa-solid fa-tools" /> Add Roadblock
      </Button>
      <Button onClick={handleComplete} variant="success" size="sm">
        <FontAwesomeIcon icon="fa-solid fa-check" /> Mark As Complete{" "}
      </Button>
      <Button onClick={handleRemove} variant="outline-danger" size="sm">
        <FontAwesomeIcon icon="fa-solid fa-times" /> Remove{" "}
      </Button>
      <RoadblockModal
        {...props}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </div>
  );
}
