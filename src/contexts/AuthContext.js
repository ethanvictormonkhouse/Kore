import React, { useContext, createContext, useState } from "react";
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
import { getDoc, doc } from "firebase/firestore";
import { db } from "../services/firebase";

/*----------INITIALIZE CONTEXT----------*/
const AuthContext = createContext();
export function useAuth() {
  return useContext(AuthContext);
}
/*----------INITIALIZE CONTEXT----------*/

export function AuthProvider({ children }) {
  /*----------INITIALIZE STATE----------*/
  const [currentUser, setCurrentUser] = useState();
  const [currentUserData, setCurrentUserData] = useState();

  /*----------FIREBASE AUTH FUNCTIONS----------*/
  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password).then(
      async (res) => {
        const docSnap = await getDoc(doc(db, "users", currentUser.uid));
        if (docSnap.exists()) {
          setCurrentUserData(docSnap.data());
          console.log("Document data:", docSnap.data());
        } else {
          console.log("No such document!");
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

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setCurrentUser(user);
    } else {
      setCurrentUser(user);
      setCurrentUserData();
    }
  });

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

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
