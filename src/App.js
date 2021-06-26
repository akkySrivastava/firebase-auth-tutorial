import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Home from "./Home";
import { login, logout, selectUser } from "./features/userSlice";
import { auth } from "./firebase";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          login({
            uid: authUser.uid,
            name: authUser.displayName ? authUser.displayName : authUser.email,
            verified: String(authUser.emailVerified),
            pic: authUser.photoURL
              ? authUser.photoURL
              : "https://johannesippen.com/img/blog/humans-not-users/header.jpg",
            lastsignIn: authUser.metadata.lastSignInTime,
          })
        );
        console.log(authUser);
      } else {
        dispatch(logout());
      }
    });
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    !isRegister ? handleRegister() : handleLogin();
  };

  const handleRegister = () => {
    if (email && password !== "") {
      auth
        .createUserWithEmailAndPassword(email, password)
        .then((data) => {
          alert("Registered successfully!!! 😆");
        })
        .catch((err) => {
          alert(err);
        });
    } else {
      alert("Please fill out fields");
    }
  };

  const handleLogin = () => {
    if (email && password !== "") {
      auth
        .signInWithEmailAndPassword(email, password)
        .then((data) => {
          alert("Logged in successfully!!! 😆");
        })
        .catch((err) => alert(err));
    } else {
      alert("Please fill out fields");
    }
  };

  return (
    <div className="App">
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
