import React from "react";
import "./Post.css";

function Post(props) {
  return (
    <div className="Post">
      <div className="postContainer">
        {props.image === "" ? null : (
          <img className="postImage" src={props.image} />
        )}
        <div class="posterInfo">
          <div id="user">Anonymous</div>
          <div>{props.title}</div>
          {props.time ? (
            <div>
              {props.time.toDate().toDateString() +
                " " +
                props.time.toDate().toLocaleTimeString()}
            </div>
          ) : null}
          {/* <div>{props.time.toDate().toString()}</div> */}
          <div className="postNo" onClick={() => props.clickReply()}>
            No. {props.postNo}
          </div>
        </div>
        <div id="postText">{props.text}</div>
      </div>
    </div>
  );
}

export default Post;
