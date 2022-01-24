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
import { setDoc, getDoc, doc } from "firebase/firestore";
import { db } from "../services/firebase";

/*----------INITIALIZE CONTEXT----------*/
const AuthContext = createContext();
export function useAuth() {
  return useContext(AuthContext);
}
/*----------INITIALIZE CONTEXT----------*/

export function AuthProvider({ children }) {
  /*----------INITIALIZE STATE----------*/
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState();
  const [currentUserData, setCurrentUserData] = useState({
    fname: "",
    lname: "",
    email: "",
    team: "",
    base: "",
  });

  /*----------FIREBASE AUTH FUNCTIONS----------*/
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
        return currentUserData;
      }
    );
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password).then(
      async (res) => {
        const docSnap = await getDoc(doc(db, "users", res.user.uid));
        if (docSnap.exists()) {
          setCurrentUserData(docSnap.data());
        } else {
        }
        return docSnap;
      }
    );
  }

  function logout() {
    return signOut(auth);
  }

  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }

  function changeEmail(email) {
    return updateEmail(auth.currentUser, email);
  }

  function changePassword(password) {
    return updatePassword(auth.currentUser, password);
  }

  /*----------USER CHANGE HANDLER----------*/

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        const docSnap = await getDoc(doc(db, "users", user.uid));
        if (docSnap.exists()) {
          setCurrentUserData(docSnap.data());
        }
        setLoading(false);
        return docSnap;
      }
      setLoading(false);
    });
  }, []);

  /*----------CONTEXT OBJECT----------*/
  const value = {
    currentUser,
    currentUserData,
    login,
    signup,
    logout,
    resetPassword,
    changeEmail,
    changePassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
