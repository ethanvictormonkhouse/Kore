import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { deleteDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "../../../../services/firebase";
import { Button } from "react-bootstrap";

import SolutionModal from "../Solutions/SolutionModal";

export default function RoadblockOptions(props) {
  const [modalShow, setModalShow] = useState(false);

  const handleRemove = async () => {
    const promises = [];
    promises.push(deleteDoc(doc(db, "roadblocks", props.id)));
    promises.push(
      updateDoc(doc(db, "tasks", props.task), { status: "Active" })
    );

    Promise.all(promises)
      .then((res) => {
        return res[0];
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div className="d-grid gap-3">
      <Button onClick={() => setModalShow(true)} variant="success" size="sm">
        <FontAwesomeIcon icon="fa-solid fa-lightbulb" /> Offer Solution
      </Button>
      <Button onClick={handleRemove} variant="outline-danger" size="sm">
        <FontAwesomeIcon icon="fa-solid fa-times" /> Cancel{" "}
      </Button>
      <SolutionModal
        {...props}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </div>
  );
}
