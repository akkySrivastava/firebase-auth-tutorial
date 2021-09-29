import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";
import { auth } from "./firebase";

function Home() {
  const user = useSelector(selectUser);
  const handleLogout = () => {
    if (window.confirm("Wanna break up with us :(")) {
      auth.signOut();
    }
  };
  return (
    <div className="container">
      <div className="content">
        <h1>Securely logged in</h1>
        <div className="info">
          <img alt="" />
        </div>
        <div className="info">
          <p>Id:</p>
          <span>{user.id}</span>
        </div>
        <div className="info">
          <p>Name:</p> <span>{String(user.name).split("@")[0]}</span>
        </div>
        <div className="info">
          <p>Verified:</p> <span>{user.verified}</span>
        </div>

        <button onClick={handleLogout}>Logout</button>
        <div className="info">
          <p>Last login : {user.lastsignIn}</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
