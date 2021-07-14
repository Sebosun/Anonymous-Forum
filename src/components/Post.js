import React, { useState } from "react";
import "./Post.css";

function Post(props) {
  const [imgSize, setImgSize] = useState({
    maxHeight: "15vh",
  });

  const handleImageSize = () => {
    if (imgSize.maxHeight === "15vh") {
      setImgSize({
        maxHeight: "45vh",
      });
    } else {
      setImgSize({
        maxHeight: "15vh",
      });
    }
  };

  return (
    <div className="Post">
      <div className="postContainer">
        <div className="posterInfo">
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
          <div
            className="postNo"
            onClick={() => props.clickReply(props.postNo)}
          >
            No. {props.postNo}
          </div>
        </div>
      </div>
      <p class="postText">
        <img
          className="postImage"
          style={imgSize}
          onClick={handleImageSize}
          src={props.image}
        />
        {props.text}
      </p>
    </div>
  );
}

export default Post;
