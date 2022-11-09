import React from "react";
import { auth, provider, UseFirebaseValue, db } from "../Firebase";
import { doc, setDoc } from "firebase/firestore";
import { signInWithPopup } from "firebase/auth";
import logo from "../assets/images/logo.png";
import "../App.css";

const Login = () => {
  const [, dispatch] = UseFirebaseValue();
  async function UserToFirestore(user) {
    const UserFirestore = doc(db, "Users", user.email);
    const data = {
      name: user.displayName,
      email: user.email,
      emailVerified: user.emailVerified,
      photoURL: user.photoURL,
    };
    await setDoc(UserFirestore, data, { merge: true });
  }
  const login = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        localStorage.setItem("User", JSON.stringify(user));
        dispatch({
          type: "setUser",
          user: user,
        });
        UserToFirestore(user);
      })
      .catch((error) => {
        // // Handle Errors here.
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // // The email of the user's account used.
        // const email = error.customData.email;
        // // The AuthCredential type that was used.
        // const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  const style = {
    display: "gird",
  };

  return (
    <div style={style}>
      <center>
        <img src={logo} alt="" />
      </center>
      <center>
        <div className="google-btn" onClick={login}>
          <div className="google-icon-wrapper">
            <img
              className="google-icon"
              src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
              alt="googleProfile"
            />
          </div>
          <p className="btn-text">
            <b>Sign in with google</b>
          </p>
        </div>
      </center>
    </div>
  );
};

export default Login;
