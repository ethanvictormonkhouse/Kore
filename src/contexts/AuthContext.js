import React, { useContext, createContext, useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  updateEmail,
  updatePassword,
} from "firebase/auth";
import { auth } from "../services/firebase";
import {
  setDoc,
  getDoc,
  doc,
  query,
  collection,
  where,
  getDocs,
} from "firebase/firestore";
import { onDisconnect, onValue, ref, set, remove } from "firebase/database";
import { db, rtdb } from "../services/firebase";

/*----------INITIALIZE CONTEXT----------*/
const AuthContext = createContext();
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
  });

  /*----------FIREBASE AUTH FUNCTIONS----------*/
  //function allowing the user to signup
  function signup(email, password, fname, lname, team, base) {
    const userData = {
      fname: fname,
      lname: lname,
      email: email,
      team: team,
      base: base,
    };
    return createUserWithEmailAndPassword(auth, email, password).then(
      async (res) => {
        await setDoc(doc(db, "users", res.user.uid), userData);
        setCurrentUserData(userData);
        setLoading(false);
        return currentUserData;
      }
    );
  }

  //function allowing the user to login
  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password).then(
      async (res) => {
        const docSnap = await getDoc(doc(db, "users", res.user.uid));
        if (docSnap.exists()) {
          setCurrentUserData(docSnap.data());
        }
        setLoading(false);
        return docSnap;
      }
    );
  }

  //function allowing the user to logout
  function logout() {
    remove(ref(rtdb, "users/" + currentUser.uid)); //if logout, remove userStatus from Firebase
    return signOut(auth);
  }
  //function allowing the user to change their email
  function changeEmail(email) {
    return updateEmail(auth.currentUser, email);
  }
  //function allowing the user to change their password
  function changePassword(password) {
    return updatePassword(auth.currentUser, password);
  }
  //function allowing the user to reset their password
  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }

  /*----------REALTIME DATABASE FUNCTIONS----------*/

  //function to update the user's status on Firebase
  function updateStatus(user, newStatus, newDesc) {
    const date = Date.now();
    const status = {
      status: newStatus,
      desc: newDesc,
      updated: date,
    };
    set(ref(rtdb, "users/" + user), status);
    setCurrentUserStatus(status);
  }

  // function onlineMembers(teamMembers) {
  //   var memberStatus = [];
  //   teamMembers.forEach((member) => {
  //     get(child(ref(rtdb), `users/${member.id}`))
  //       .then((snapshot) => {
  //         if (snapshot.exists()) {
  //           memberStatus.push({
  //             uid: snapshot.key,
  //             status: snapshot.val().status,
  //           });
  //         } else {
  //           memberStatus.push({
  //             uid: snapshot.key,
  //             status: "Offline",
  //           });
  //         }
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //       });
  //   });
  //   setUsersStatus(memberStatus);
  // }

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
      setCurrentUser(user); //set currentUser if authentication state changes
      if (user) {
        onDisconnect(ref(rtdb, "users/" + user.uid)).remove(); //send function to Firebase incase the user disconnects
        userPresenceListener();
        const userDocData = await getDoc(doc(db, "users", user.uid));
        const baseDocData = await getDoc(
          doc(db, "bases", userDocData.data().base)
        );
        const teamDocData = await getDoc(
          doc(db, "teams", userDocData.data().team)
        );
        const q = query(
          collection(db, "users"),
          where("team", "==", userDocData.data().team)
        );
        const teamMembersDocs = await getDocs(q);
        // onlineMembers(teamMembersDocs.docs);

        if (userDocData.exists()) {
          //set userData and userStatus if a profile is found in Firestore
          updateStatus(user.uid, "Available", "");
          setCurrentUserData(userDocData.data());
          setTeamData(teamDocData.data());
          setBaseData(baseDocData.data());
          setTeamMembers(teamMembersDocs.docs);
        }
        setLoading(false);
        return userDocData;
      }
      setLoading(false);
    });
  }, []); //only run once

  /*----------CONTEXT OBJECT----------*/
  const value = {
    //object of variables and functions to export to the rest of the application
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
  };

  return (
    //if not loading, export
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
