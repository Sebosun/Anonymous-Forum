import React, { useState } from "react";
import "./Post.css";

function Post(props) {
  const [imgSize, setImgSize] = useState({
    maxHeight: "15wh",
  });

  const handleImageSize = () => {
    if (imgSize.maxHeight === "15vw") {
      setImgSize({
        maxHeight: "30vw",
      });
    } else {
      setImgSize({
        maxHeight: "15vw",
      });
    }
  };

  return (
    <div className="Post">
      {props.image === "" ? null : (
        <img
          className="postImage"
          style={imgSize}
          onClick={handleImageSize}
          src={props.image}
        />
      )}
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

      <p class="postText">{props.text}</p>
    </div>
  );
}

export default Post;
