import React from "react";
import "./Post.css";

function Post(props) {
  return (
    <div className="Post">
      <div className="postContainer">
        <div class="posterInfo">
          <img src={props.image} style={{ width: "30vh" }} />
          <div id="user">Anonymous</div>
          <div>{props.title}</div>
          {props.time ? <div>{props.time.toDate().toString()}}</div> : null}
          {/* <div>{props.time.toDate().toString()}</div> */}
          <div>No. {props.postNo}</div>
        </div>
        <div id="postText">{props.text}</div>
      </div>
    </div>
  );
}

export default Post;
