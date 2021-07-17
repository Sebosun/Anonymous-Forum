import React, { useState, useEffect } from "react";
import "./Thread.css";
import Post from "./Post.js";
import { firebase } from "@firebase/app";
import ShowPostForm from "./ShowPostForm";
import Image from "./UI/Image";
import HideElement from "./UI/HideElement";
import ExpandThread from "./UI/ExpandThread";

function Thread(props) {
  // TODO clicking postNo should open up form and fill it automatically with >>7
  const [postsCol, setPostsCol] = useState([]);
  const [replyVisible, setReplyVisible] = useState(false);
  const [threadVisible, setThreadVisible] = useState(true);
  const [hideText, setHideText] = useState("close");
  const [threadSize, setThreadSize] = useState("");

  function getNumberOfElements() {
    const db = firebase.firestore();
    db.collection("board")
      .doc(props.id)
      .collection("posts")
      .get()
      .then((snap) => {
        setThreadSize(snap.size);
      });
  }

  function getPostsFromThread() {
    const db = firebase.firestore();
    const posts = db
      .collection("board")
      .doc(props.id)
      .collection("posts")
      .orderBy("postNo", "asc")
      .limit(3);

    posts.onSnapshot((serverUpdate) => {
      const firebasePosts = serverUpdate.docs.map((_doc) => {
        let data = _doc.data();
        data.id = _doc.id;
        return data;
      });
      setPostsCol(firebasePosts);
    });
  }

  function clickReply() {
    setReplyVisible((prevState) => !prevState);
  }

  function hideThread() {
    setThreadVisible((prevState) => !prevState);
    setHideText((prevState) => {
      if (prevState == "close") {
        return props.user ? props.user : "Anyonymous";
      } else {
        return "close";
      }
    });
  }

  // onLoad get posts for a given Thread
  useEffect(() => {
    getNumberOfElements();
    getPostsFromThread();
  }, []);

  return (
    <div className="Thread">
      <HideElement text={hideText} onClick={hideThread} />
      {threadVisible && (
        <div className="threadContainer">
          {replyVisible && (
            <ShowPostForm hidden={true} thread={false} id={props.id} />
          )}

          {/* split this into two, image is one part of the post, and the content second */}
          <div className="threadInfo">
            <Image src={props.image} />
            <div className="threadInfoContainer">
              <div className="user" id="user">
                {props.user ? props.user : "Anyonymous"}
              </div>
              <div className="title">
                {props.title ? props.title : "Thread"}
              </div>
              {/* workaround for a bug with toDate.toString crashing the app when new thread is added */}
              {props.time ? (
                <div className="time">
                  {props.time.toDate().toDateString() +
                    " " +
                    props.time.toDate().toLocaleTimeString()}
                </div>
              ) : null}
              <div className="postNo" onClick={() => clickReply()}>
                No. {props.postNo}
              </div>
            </div>
            <div className="postText">
              <p>{props.text}</p>
            </div>
            <ExpandThread postNo={threadSize} />
          </div>

          {postsCol.map((post, index) => {
            return (
              <Post
                key={index}
                id={post.id}
                postNo={post.postNo}
                title={post.title}
                time={post.created}
                text={post.text}
                image={post.image}
                user={post.user}
                clickReply={clickReply}
              />
            );
          })}
          <ShowPostForm thread={false} id={props.id} />
        </div>
      )}
    </div>
  );
}

export default Thread;
