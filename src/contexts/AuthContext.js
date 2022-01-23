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
import { db } from "../services/firebase";
import { getDoc, doc } from "firebase/firestore";

/*----------INITIALIZE CONTEXT----------*/
const AuthContext = createContext();
export function useAuth() {
  return useContext(AuthContext);
}
/*----------INITIALIZE CONTEXT----------*/

export function AuthProvider({ children }) {
  /*----------INITIALIZE STATE----------*/
  const [currentUserData, setCurrentUserData] = useState();
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  /*----------FIREBASE AUTH FUNCTIONS----------*/
  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
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
  async function getUserData(user) {
    if (user) {
      const docSnap = await getDoc(doc(db, "users", user.uid));
      return docSnap;
    }
    return user;
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      getUserData(user).then((docSnap) => {
        if (docSnap) {
          setCurrentUserData(docSnap.data());
        }
        setLoading(false);
      });
    });
    return unsubscribe;
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
