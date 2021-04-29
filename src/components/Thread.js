import React, { useState, useEffect } from "react";
import "./Thread.css";
import Post from "./Post.js";
import { firebase } from "@firebase/app";
import PostForm from "./PostForm";

function Thread(props) {
  // TODO expand image on click
  const [postsCol, setPostsCol] = useState([]);
  const [replyVisible, setReplyVisible] = useState(false);

  function getPostsFromThread() {
    const db = firebase.firestore();
    const posts = db
      .collection("board")
      .doc(props.id)
      .collection("posts")
      .orderBy("postNo", "asc");

    posts.onSnapshot((serverUpdate) => {
      const firebasePosts = serverUpdate.docs.map((_doc) => {
        let data = _doc.data();
        data.id = _doc.id;
        return data;
      });
      setPostsCol(firebasePosts);
    });
  }

  // onLoad get posts for a given Thread
  useEffect(() => {
    getPostsFromThread();
    console.log("Posts", postsCol);
  }, []);

  return (
    <div className="Thread">
      <div className="threadReplyContainer">
        {replyVisible ? (
          <PostForm thread={false} id={props.id} />
        ) : (
          <button
            onClick={(e) => {
              e.preventDefault();
              setReplyVisible(!replyVisible);
            }}
            style={{ width: "200px" }}
          >
            Reply to thread
          </button>
        )}

        {/* split this into two, image is one part of the post, and the content second */}
        <div className="threadInfo">
          {/* TODO: onClick event on image changing it to 100% and back */}
          <img className="image" src={props.image} />
          <div className="threadContainer">
            <div className="user" id="user">
              {props.user ? props.user : "Anyonymous"}
            </div>
            <div className="title">{props.title ? props.title : "Thread"}</div>
            {/* workaround for a bug with toDate.toString crashing the app when new thread is added */}
            {props.time ? (
              <div className="time">
                {props.time.toDate().toDateString() +
                  " " +
                  props.time.toDate().toLocaleTimeString()}
              </div>
            ) : null}
            <div className="postNo">No. {props.postNo}</div>
          </div>
          <div className="postText" id="postText">
            {props.text}
          </div>
        </div>
      </div>

      {postsCol.map((post, index) => {
        return (
          <Post
            postNo={post.postNo}
            title={post.title}
            time={post.created}
            text={post.text}
            id={post.id}
            key={index}
            image={post.image}
          />
        );
      })}
    </div>
  );
}

export default Thread;
