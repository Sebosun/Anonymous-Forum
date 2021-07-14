import React, { useState, useEffect } from "react";
import "./App.css";
import { firebase } from "@firebase/app";

import Thread from "./components/Thread";
import Header from "./components/Header";
import PostForm from "./components/PostForm.js";
import ShowPostForm from "./components/ShowPostForm";

function App() {
  const [threadPosts, setThreadPosts] = useState([]);
  const [showForm, setShowForm] = useState(false);

  // increases firestore count

  async function getThreads() {
    const board = await firebase.firestore().collection("board").get();
    const mappedBoard = board.docs.map((doc) => doc.data());
    // console.log(mappedBoard);
    return mappedBoard;
  }

  //
  useEffect(() => {
    firebase
      .firestore()
      .collection("board")
      .orderBy("created", "desc")
      .onSnapshot((serverUpdate) => {
        const firebaseThreads = serverUpdate.docs.map((_doc) => {
          let data = _doc.data();
          data.id = _doc.id;
          return data;
        });

        setThreadPosts(firebaseThreads);
        // console.log("Threads", threadPosts);
      });
  }, []);

  function openCloseForm() {
    setShowForm(!showForm);
  }

  return (
    <div className="App">
      <Header chan="Beschan" desc="A safe space for your catboy fantasies" />
      <ShowPostForm showForm={showForm} openCloseForm={openCloseForm} />
      {/* {!showForm ? ( */}
      {/*   <div className="showButton"> */}
      {/*     <button className="showButton" onClick={() => openCloseForm()}> */}
      {/*       Add a thread! */}
      {/*     </button> */}
      {/*   </div> */}
      {/* ) : ( */}
      {/*   <div> */}
      {/*     <PostForm openCloseForm={openCloseForm} thread={true} /> */}
      {/*     <button onClick={openCloseForm}>Close</button> */}
      {/*   </div> */}
      {/* )} */}

      <div className="Threads">
        {threadPosts.map((thread, index) => {
          return (
            <Thread
              key={index}
              id={thread.id}
              postNo={thread.postNo}
              user={thread.user}
              title={thread.title}
              time={thread.created}
              text={thread.text}
              image={thread.image}
            />
          );
        })}
      </div>

      <ShowPostForm showForm={showForm} openCloseForm={openCloseForm} />
    </div>
  );
}
export default App;
