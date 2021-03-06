/*----------IMPORT REACT----------*/
import React, { useContext, createContext, useState, useEffect } from "react";

//*----------IMPORT FIREBASE TOOLS----------*/
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  updateEmail,
  updatePassword,
} from "firebase/auth";
import {
  setDoc,
  getDoc,
  doc,
  query,
  collection,
  where,
  getDocs,
  addDoc,
  updateDoc,
  Timestamp,
} from "firebase/firestore";
import { onDisconnect, onValue, ref, set, remove } from "firebase/database";
import { ref as sRef, uploadBytes, getDownloadURL } from "firebase/storage";

/*----------IMPORT FIREBASE APP----------*/
import { auth } from "../services/firebase";
import { db, rtdb, storage } from "../services/firebase";

/*----------INITIALIZE CONTEXT----------*/
const AuthContext = createContext();

/*----------EXPORT CONTEXT----------*/
export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  /*----------INITIALIZE STATE----------*/
  const [loading, setLoading] = useState(true);
  const [teamData, setTeamData] = useState({ name: "...", status: "..." });
  const [teamMembers, setTeamMembers] = useState([]);
  const [userPresence, setUserPresence] = useState({
    status: "...",
    updated: "...",
  });
  const [baseData, setBaseData] = useState({
    code: "...",
    country: "...",
    name: "...",
    region: "...",
    tz: "...",
  });
  const [currentUser, setCurrentUser] = useState("");
  const [currentUserStatus, setCurrentUserStatus] = useState({
    status: "...",
  });
  const [currentUserData, setCurrentUserData] = useState({
    fname: "...",
    lname: "...",
    email: "...",
    team: "...",
    base: "...",
    avatar: "...",
    vfp: "...",
  });

  /*----------FIREBASE AUTH FUNCTIONS----------*/
  /*----------SIGNUP FUNCTION----------*/
  function signup(email, password, fname, lname, team, base, avatar) {
    return createUserWithEmailAndPassword(auth, email, password)
      .then(async (res) => {
        await uploadBytes(sRef(storage, res.user.uid + ".png"), avatar);
        return res;
      })
      .then(async (res) => {
        const photoURL = await getDownloadURL(
          sRef(storage, res.user.uid + ".png")
        );
        await setDoc(doc(db, "users", res.user.uid), {
          fname: fname,
          lname: lname,
          email: email,
          team: team,
          base: base,
          avatar: photoURL,
          vfp: { realized: 0, unrealized: 0, multiplier: 3 },
        });
        return res;
      });
  }

  /*----------LOGIN FUNCTION----------*/
  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password).then((res) => {
      return res;
    });
  }

  /*----------LOGOUT FUNCTION----------*/
  function logout() {
    remove(ref(rtdb, "users/" + currentUser.uid));
    return signOut(auth);
  }

  /*----------CHANGE EMAIL FUNCTION----------*/
  function changeEmail(email) {
    return updateEmail(auth.currentUser, email);
  }

  /*----------CHANGE PASSWORD FUNCTION----------*/
  function changePassword(password) {
    return updatePassword(auth.currentUser, password);
  }

  /*----------RESET PASSWORD FUNCTION----------*/
  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }

  /*----------FIRESTORE FUNCTIONS----------*/
  /*----------FIND TEAM MEMBER FUNCTION----------*/
  function findUser(user) {
    try {
      if (currentUser && teamMembers[1]) {
        return teamMembers.find((element) => element.id === user).data();
      } else return "Unknown";
    } catch (err) {
      console.log(err.message);
    }
  }
  /*----------FIND USER STATUS FUNCTION----------*/
  function findUserStatus(user) {
    if (userPresence && userPresence[user])
      return {
        status: userPresence[user].status,
        updated: userPresence[user].updated,
      };
    else
      return {
        status: "Offline",
      };
  }

  /*----------FIND USER FUNCTION----------*/
  async function getUserData(user) {
    return await getDoc(doc(db, "users", user));
  }

  /*----------CREATE TASK FUNCTION----------*/
  async function createTask(title, desc, status, assigned_to) {
    return await addDoc(collection(db, "tasks"), {
      title: title,
      desc: desc,
      status: status,
      assigned_to: assigned_to,
      team: currentUserData.team,
      created_by: auth.currentUser.uid,
      created_at: Timestamp.fromDate(new Date()),
    });
  }

  /*----------CREATE ROADBLOCK FUNCTION----------*/
  async function createRoadblock(task_id, task_title, issue, status) {
    return await addDoc(collection(db, "roadblocks"), {
      task_id: task_id,
      task_title: task_title,
      issue: issue,
      status: status,
      solution: "No Current Solution",
      solution_by: "",
      created_by: auth.currentUser.uid,
      created_at: Timestamp.fromDate(new Date()),
    }).then(async () => {
      return await updateDoc(doc(db, "tasks", task_id), {
        status: "Open Roadblock",
      });
    });
  }

  /*----------CREATE SOLUTION FUNCTION----------*/
  async function createSolution(roadblock_id, task_id, solution) {
    const promises = [];
    promises.push(
      updateDoc(doc(db, "tasks", task_id), {
        status: "Awaiting Solution Response",
      })
    );
    promises.push(
      updateDoc(doc(db, "roadblocks", roadblock_id), {
        status: "Awaiting Response",
        solution: solution,
        solution_by: auth.currentUser.uid,
      })
    );
  }

  /*----------CREATE APPRAISAL FUNCTION----------*/
  async function createAppraisal(task_id, task_title, type, comment, given_to) {
    return await addDoc(collection(db, "appraisals"), {
      task_id: task_id,
      task_title: task_title,
      type: type,
      comment: comment,
      given_to: given_to,
      created_by: auth.currentUser.uid,
      created_at: Timestamp.fromDate(new Date()),
    }).then(async () => {
      return await getUserData(given_to).then(async (res) => {
        const promises = [];
        if (type === "positive") {
          promises.push(updateVFP(given_to, 3));
          promises.push(updateVFP(auth.currentUser.uid, 1));
        } else {
          promises.push(updateVFP(auth.currentUser.uid, 1));
          promises.push(updateMultiplier(given_to, 0.25));
        }

        Promise.all(promises)
          .then((res) => {
            return res;
          })
          .catch((err) => {
            console.log(err.message);
          });
      });
    });
  }

  /*----------UPDATE VFP FUNCTION----------*/
  async function updateVFP(user, vfp) {
    return await getUserData(user).then(async (res) => {
      return await updateDoc(doc(db, "users", user), {
        "vfp.unrealized":
          res.data().vfp.unrealized + vfp * res.data().vfp.multiplier,
        "vfp.multiplier":
          res.data().vfp.multiplier + 0.25 > 3
            ? 3
            : res.data().vfp.multiplier + 0.25,
      });
    });
  }

  /*----------UPDATE MULTIPLIER FUNCTION----------*/
  async function updateMultiplier(user, multiplier) {
    return await getUserData(user).then(async (res) => {
      return await updateDoc(doc(db, "users", user), {
        "vfp.multiplier":
          res.data().vfp.multiplier - multiplier < 1
            ? 1
            : res.data().vfp.multiplier - multiplier,
      });
    });
  }

  /*----------REALTIME DATABASE FUNCTIONS----------*/

  /*----------UPDATE STATUS FUNCTION----------*/
  function updateStatus(user, newStatus, newDesc) {
    const status = {
      status: newStatus,
      desc: newDesc,
      updated: Timestamp.fromDate(new Date()),
    };
    set(ref(rtdb, "users/" + user), status);
    setCurrentUserStatus(status);
  }

  /*----------USER STATUS LISTENER----------*/
  function userPresenceListener() {
    const usersRef = ref(rtdb, "users/");
    onValue(usersRef, (snapshot) => {
      const data = snapshot.val();
      setUserPresence(data);
    });
  }

  /*----------AUTH STATE LISTENER----------*/
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      setLoading(true);
      setCurrentUser(user); //set currentUser if authentication state changes
      if (user) {
        onDisconnect(ref(rtdb, "users/" + user.uid)).remove(); //send function to Firebase incase the user disconnects
        userPresenceListener();

        await getDoc(doc(db, "users", user.uid)).then((res) => {
          const promises = [];

          const q = query(
            collection(db, "users"),
            where("team", "==", res.data().team)
          );

          promises.push(res);
          promises.push(getDoc(doc(db, "bases", res.data().base)));
          promises.push(getDoc(doc(db, "teams", res.data().team)));
          promises.push(getDocs(q));

          Promise.all(promises)
            .then((res) => {
              updateStatus(user.uid, "Available", "");
              setCurrentUserData(res[0].data());
              setBaseData(res[1].data());
              setTeamData(res[2].data());
              setTeamMembers(res[3].docs);
            })
            .catch((err) => {
              console.log(err.message);
            })
            .finally(() => {
              setLoading(false);
              return currentUser;
            });
        });
      } else {
        setLoading(false);
      }
    });
  }, []); //ONLY CALL ONCE

  /*----------CONTEXT OBJECT----------*/
  const value = {
    currentUser,
    currentUserStatus,
    currentUserData,
    teamData,
    baseData,
    teamMembers,
    userPresence,
    login,
    signup,
    logout,
    resetPassword,
    changeEmail,
    changePassword,
    updateStatus,
    createTask,
    createRoadblock,
    createAppraisal,
    findUser,
    findUserStatus,
    createSolution,
    updateVFP,
  };

  return (
    /*----------RENDER WRAPPED CHILDREN----------*/
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
