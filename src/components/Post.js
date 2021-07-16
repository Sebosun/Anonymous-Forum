import React, { useState } from "react";
import "./Post.css";
import Image from "./UI/Image";

function Post(props) {
  //TODO CLEAN THIS
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
        <Image src={props.image} />
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
        <p class="postText">{props.text}</p>
      </div>
    </div>
  );
}

export default Post;
