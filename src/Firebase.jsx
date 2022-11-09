import React, { useContext, useReducer } from "react";
import { initializeApp } from "firebase/app";
import { createContext } from "react";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

export const FirebaseContext = createContext();

function Firebase({ initialState, reducer, children }) {
  return (
    <FirebaseContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </FirebaseContext.Provider>
  );
}

export default Firebase;
const firebaseConfig = {
  // apiKey: "AIzaSyAj6XY9SZPryXdRJkB2slJWwS9NUwXiE1c",
  // authDomain: "lets-chat-f46b7.firebaseapp.com",
  // projectId: "lets-chat-f46b7",
  // storageBucket: "lets-chat-f46b7.appspot.com",
  // messagingSenderId: "721855286896",
  // appId: "1:721855286896:web:072a8d2c7981bd8e5c6eb5",
  // measurementId: "G-B77LMPKNSB",
  apiKey: "AIzaSyCWuS4Rp2Vg735wS-_HQ5OQcdCvDgUX1GI",
  authDomain: "lets-chat-3aabf.firebaseapp.com",
  projectId: "lets-chat-3aabf",
  storageBucket: "lets-chat-3aabf.appspot.com",
  messagingSenderId: "401348446642",
  appId: "1:401348446642:web:f395a753b286cf89ef3cab",
  measurementId: "G-Z69SRG6BY9",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export const UseFirebaseValue = () => useContext(FirebaseContext);
