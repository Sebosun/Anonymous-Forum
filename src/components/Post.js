import React, { useState } from "react";
import "./Post.css";

function Post(props) {
  const [imgSize, setImgSize] = useState({
    height: "15vh",
  });

  function handleImageSize() {
    if (imgSize.height === "15vh") {
      setImgSize({
        height: "50vh",
      });
    } else {
      setImgSize({
        height: "15vh",
      });
    }
  }

  return (
    <div className="Post">
      <div className="postContainer">
        {props.image === "" ? null : (
          <img
            className="postImage"
            src={props.image}
            style={imgSize}
            onClick={handleImageSize}
          />
        )}
        <div class="posterInfo">
          <div id="user">{props.user ? props.user : "Anyonymous"}</div>
          <div>{props.title}</div>
          {props.time ? (
            <div>
              {props.time.toDate().toDateString() +
                " " +
                props.time.toDate().toLocaleTimeString()}
            </div>
          ) : null}
          {/* <div>{props.time.toDate().toString()}</div> */}
          <div
            className="postNo"
            onClick={() => props.clickReply(props.postNo)}
          >
            No. {props.postNo}
          </div>
        </div>
        <div id="postText">{props.text}</div>
      </div>
    </div>
  );
}

export default Post;
