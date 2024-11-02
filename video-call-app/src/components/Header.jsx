import React from "react";
import ProfileIcon from "./ProfileIcon";

const Header = () => {
  return (
    <div>
      <div className="wrapper header">
        <img src="/vite.svg" alt="logo" className="logo" />
        <ProfileIcon />
      </div>
      <hr />
    </div>
  );
};

export default Header;
