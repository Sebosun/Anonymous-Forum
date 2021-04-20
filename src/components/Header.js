import React from "react";
import "./Header.css";

function Header(props) {
  return (
    <div className="header">
      <h1>{props.chan}</h1>
      <p>{props.desc}</p>
    </div>
  );
}

export default Header;
