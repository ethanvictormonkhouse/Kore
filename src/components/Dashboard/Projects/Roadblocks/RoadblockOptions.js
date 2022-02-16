import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { deleteDoc, updateDoc, doc } from "firebase/firestore";
import { auth, db } from "../../../../services/firebase";
import { Button } from "react-bootstrap";

import SolutionModal from "../Solutions/SolutionModal";

export default function RoadblockOptions(props) {
  const [modalShow, setModalShow] = useState(false);
  const [pending, setPending] = useState(false);

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

  const handleAccept = async () => {
    const promises = [];
    promises.push(
      updateDoc(doc(db, "tasks", props.task), { status: "Active" })
    );
    promises.push(
      updateDoc(doc(db, "roadblocks", props.id), {
        status: "Closed",
      })
    );
    Promise.all(promises)
      .then((res) => {
        return res[0];
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const handleReject = async () => {
    const promises = [];

    promises.push(updateDoc(doc(db, "tasks", props.task), { status: "Open" }));
    promises.push(
      updateDoc(doc(db, "roadblocks", props.id), {
        status: "Open",
        solution: "No Current Solution",
        solution_by: "",
      })
    );
    Promise.all(promises)
      .then((res) => {
        return res[0];
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    if (props.status === "Awaiting Response") {
      setPending(true);
    } else {
      setPending(false);
    }
  }, [props.status]);

  return (
    <div className="d-grid gap-3">
      {props.created === auth.currentUser.uid ? (
        pending ? (
          <div className="d-grid gap-3">
            <Button onClick={handleAccept} variant="success" size="sm">
              <FontAwesomeIcon icon="fa-solid fa-check" /> Accept Solution{" "}
            </Button>
            <Button onClick={handleReject} variant="danger" size="sm">
              <FontAwesomeIcon icon="fa-solid fa-times" /> Reject Solution{" "}
            </Button>
          </div>
        ) : (
          <Button onClick={handleRemove} variant="outline-danger" size="sm">
            <FontAwesomeIcon icon="fa-solid fa-times" /> Close{" "}
          </Button>
        )
      ) : (
        <Button
          disabled={pending ? "disabled" : ""}
          onClick={() => setModalShow(true)}
          variant={pending ? "secondary" : "primary"}
          size="sm"
        >
          <FontAwesomeIcon icon="fa-solid fa-lightbulb" />{" "}
          {pending ? "Pending Solution" : "Suggest Solution"}
        </Button>
      )}

      <SolutionModal
        {...props}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </div>
  );
}
