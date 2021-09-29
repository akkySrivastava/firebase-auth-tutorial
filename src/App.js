import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { login, logout, selectUser } from "./features/userSlice";
import { auth, facebookProvider, googleProvider } from "./firebase";
import Home from "./Home";
import google from "./img/google.png";
import facebook from "./img/facebook.png";
import github from "./img/github.png";
import twitter from "./img/twitter.png";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginState, setIsLoginState] = useState("login");

  const handleSubmit = (e) => {
    e.preventDefault();
    isRegister ? handleLogin() : handleRegister();
  };

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          login({
            id: authUser.uid,
            name: authUser.displayName ? authUser.displayName : authUser.email,
            lastsignIn: authUser.metadata.lastSignInTime,
            verified: String(authUser.emailVerified),
            pic: authUser.photoURL
              ? authUser.photoURL
              : "https://lh3.googleusercontent.com/ogw/ADea4I5bHBJbpIvco4Yh1ARth7_gu4dl_QnpyDAU0NW8=s32-c-mo",
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, [dispatch]);

  const handleLogin = () => {
    if (email && password !== "") {
      auth
        .signInWithEmailAndPassword(email, password)
        .then((data) => alert("Logged in successfully!!!"))
        .catch((err) => alert(err));
    }
  };
  const handleRegister = () => {
    if (email && password !== "") {
      auth
        .createUserWithEmailAndPassword(email, password)
        .then((data) => alert("Registered Successfully"))
        .catch((err) => alert(err));
    }
  };

  const handleGoogle = () => {
    auth.signInWithPopup(googleProvider);
  };
  const handleFacebook = () => {
    auth.signInWithPopup(facebookProvider);
  };
  return (
    <div className="App">
      {" "}
      {user ? (
        <Home />
      ) : (
        <>
          <div className="container">
            <div className="container-heading">
              <h1>
                Ultimate Authentication using <br />
                <img
                  className="react"
                  alt=""
                  src="https://emojis.slackmojis.com/emojis/images/1473950148/1161/react.png?1473950148"
                ></img>{" "}
                <img
                  className="react1"
                  alt=""
                  src="https://emojis.slackmojis.com/emojis/images/1462128189/390/redux.png?1462128189"
                ></img>{" "}
                <img
                  className="react2"
                  alt=""
                  src="https://emojis.slackmojis.com/emojis/images/1533724346/4435/firebase.png?1533724346"
                ></img>
              </h1>
              <div className="content">
                <h3>{isRegister ? "Login" : "Register"}</h3>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="text"
                  required={true}
                  placeholder="Enter your email"
                />
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  required={true}
                  placeholder="Enter your password"
                />
                <button onClick={handleSubmit} type="submit">
                  Done
                </button>
                {isLoginState === "login" && (
                  <>
                    <div className="providers">
                      <div onClick={handleGoogle} className="provider">
                        <img src={google} alt="google" />
                      </div>
                      <div onClick={handleFacebook} className="provider">
                        <img src={facebook} alt="google" />
                      </div>
                      <div className="provider">
                        <img src={github} alt="google" />
                      </div>
                      <div className="provider">
                        <img src={twitter} alt="google" />
                      </div>
                    </div>
                  </>
                )}
                <p>
                  {isRegister ? "New member? " : "Already registered? "}

                  <span onClick={() => setIsRegister((show) => !show)}>
                    {isRegister ? "Register" : "Login"}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
