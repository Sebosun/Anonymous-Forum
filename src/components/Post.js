import "./Post.css";
import { useState } from "react";
import Image from "./UI/Image";
import HideElement from "./UI/HideElement";

function Post(props) {
  const [postVisible, setPostVisible] = useState(true);
  const [textOfHidePost, setTextOfHidePost] = useState("close");

  function onHideThread() {
    setPostVisible((prevState) => !prevState);
    setTextOfHidePost((prevState) => {
      if (prevState == "close") {
        return props.user ? props.user : "Anyonymous";
      } else {
        return "close";
      }
    });
  }
  return (
    <main>
      <HideElement text={textOfHidePost} onClick={onHideThread} />
      {postVisible && (
        <div className="Post">
          <div className="postContainer">
            <Image src={props.image} />
            <div className="posterInfo">
              <div id="user">Anonymous</div>
              <div>{props.title}</div>
              {props.time && (
                <div>
                  {props.time.toDate().toDateString() +
                    " " +
                    props.time.toDate().toLocaleTimeString()}
                </div>
              )}
              <div className="postNo">No. {props.postNo}</div>
            </div>
            <p className="postText">{props.text}</p>
          </div>
        </div>
      )}
    </main>
  );
}

export default Post;
