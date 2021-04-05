import React from "react";
import "./Post.css";

function Post(props) {
  return (
    <div className="Post">
      <div className="postContainer">
        <div class="posterInfo">
          <div id="user">Anonymous</div>
          <div>{props.title}</div>
          <div>{props.time}</div>
          <div>No. {props.postNo}</div>
        </div>
        <div id="postText">{props.text}</div>
      </div>
    </div>
  );
}

export default Post;
