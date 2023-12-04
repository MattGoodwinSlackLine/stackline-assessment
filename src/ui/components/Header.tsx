import React from "react";
import "./Header.css";
import logo from "../../assets/stackline_logo.svg";

const Header: React.FC = () => {
  return (
    <React.Fragment>
      <div className="HeaderBackground">
        <img
          style={{ width: "200px", padding: "15px" }}
          src={logo}
          alt="Logo"
        ></img>
      </div>
    </React.Fragment>
  );
};

export default Header;
