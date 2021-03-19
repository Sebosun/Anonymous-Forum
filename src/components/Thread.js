import React, { useState, useEffect } from "react";
import "./Thread.css";

function Thread(props) {
  return (
    <div className="Thread">
      <div className="threadContainer">
        <div>{props.postNo}</div>
        <div>{props.title}</div>
        <div>{props.time}</div>
        <div>{props.text}</div>
      </div>
    </div>
  );
}

export default Thread;
