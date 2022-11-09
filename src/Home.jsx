import React from "react";
import Feed from "./components/Feed";
import SideBar from "./components/SideBar";
import "./home.css";

const Home = () => {
  return (
    <div className="home">
      <div className="main-side-bar">
        <SideBar />
      </div>
      <div className="main-feed">
        <Feed />
      </div>
    </div>
  );
};

export default Home;
