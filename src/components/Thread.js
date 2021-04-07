import React, { useState, useEffect } from "react";
import "./Thread.css";
import Post from "./Post.js";
import { firebase } from "@firebase/app";

function Thread(props) {
  const [postsCol, setPostsCol] = useState([]);

  //
  function getPostsFromThread() {
    const db = firebase.firestore();
    const posts = db.collection("board").doc(props.id).collection("posts");
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

  async function addNewPost(name, text, title) {
    const db = firebase.firestore();
    const thread = db.collection("board").doc(props.id).collection("posts");

    const postNo = await props.getCurPostNo();

    thread
      .add({
        name: name,
        text: text,
        title: title,
        user: "Anyonymous",
        postNo: postNo,
        created: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(props.incrPostNo());
    await thread.add({});
  }

  return (
    <div className="Thread">
      <div className="threadContainer">
        <div className="threadInfo">
          <div>{props.name}</div>
          <div id="user">Anyonymous</div>
          <div>{props.title}</div>
          {/* workaround for a bug with toDate.toString crashing the app when new thread is added */}
          {props.time ? <div>{props.time.toDate().toString()}}</div> : null}
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
      <button
        onClick={() => {
          addNewPost("First", "Second", "Third");
        }}
      >
        Add poast
      </button>
    </div>
  );
}

export default Thread;
