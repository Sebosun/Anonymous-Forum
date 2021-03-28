import React, { useState, useEffect } from "react";
import "./Post.css";

function Post(props) {
  return (
    <div className="Post">
      <div className="postContainer">
        <div>Anonymous</div>
        <div>{props.postNo}</div>
        <div>{props.title}</div>
        <div>{props.time}</div>
        <div id="postText">{props.text}</div>
      </div>
    </div>
  );
}

export default Post;
