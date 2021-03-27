import React, { useState, useEffect } from "react";
import "./Thread.css";
import Post from "./Post.js";

function Thread(props) {
  return (
    <div className="Thread">
      <div className="threadContainer">
        <div>{props.postNo}</div>
        <div>{props.title}</div>
        <div>{props.time}</div>
        <div>{props.text}</div>
      </div>
      <Post postNo={2} title={"Dupa"} time={"Today"} text={"Funney text"} />
      <Post postNo={2} title={"Dupa"} time={"Today"} text={"Funney text"} />
      <Post postNo={2} title={"Dupa"} time={"Today"} text={"Funney text"} />
      <Post postNo={2} title={"Dupa"} time={"Today"} text={"Funney text"} />
    </div>
  );
}

export default Thread;
