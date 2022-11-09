import React from "react";
import OtherHousesOutlinedIcon from "@mui/icons-material/OtherHousesOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { UseFirebaseValue } from "../Firebase";

const SideBar = () => {
  const [{ user }] = UseFirebaseValue();
  return (
    <div className="sidebar">
      <img src={user.photoURL} alt="" />
      <div className="sidebar-icons">
        <OtherHousesOutlinedIcon
          sx={{ fontSize: 60, color: "rgba(0, 0, 0, 0.70)" }}
          className="home"
        />
        <SearchOutlinedIcon
          sx={{ fontSize: 60, color: "rgba(0, 0, 0, 0.70)" }}
          className="search"
        />
        <FavoriteBorderOutlinedIcon
          sx={{ fontSize: 60, color: "rgba(0, 0, 0, 0.70)" }}
          className="fav"
        />
      </div>
    </div>
  );
};

export default SideBar;
