import React, { useState, useEffect } from "react";
import "./Thread.css";
import Post from "./Post.js";
import { firebase } from "@firebase/app";

function Thread(props) {
  const [postsCol, setPostsCol] = useState([]);

  function getPostsFromThread() {
    const db = firebase.firestore();
    const data = db.collection("board").doc(props.id).collection("posts");
    data.onSnapshot((serverUpdate) => {
      const firebasePosts = serverUpdate.docs.map((_doc) => {
        let data = _doc.data();
        data.id = _doc.id;
        return data;
      });
      setPostsCol(firebasePosts);
    });
  }

  useEffect(() => {
    getPostsFromThread();
    console.log("Posts", postsCol);
  }, []);

  return (
    <div className="Thread">
      <div className="threadContainer">
        <div className="threadInfo">
          <div id="user">Anyonymous</div>
          <div>{props.title}</div>
          <div>{props.time}</div>
          <div>No. {props.postNo}</div>
          <button onClick={() => getPostsFromThread()}>Drip!</button>
        </div>
        <div id="postText">{props.text}</div>
      </div>
      {/* <Post */}
      {/*   postNo={2} */}
      {/*   title={"Dupa"} */}
      {/*   time={"Today"} */}
      {/*   text={ */}
      {/*     "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." */}
      {/*   } */}
      {/* /> */}
    </div>
  );
}

export default Thread;
