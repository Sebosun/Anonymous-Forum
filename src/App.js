import React, { useState, useEffect } from "react";
import "./App.css";
import Thread from "./components/Thread";
import Header from "./components/Header";
import { firebase } from "@firebase/app";
import PostForm from "./components/PostForm.js";

function App() {
  const [threadPosts, setThreadPosts] = useState([]);
  const [addThread, setAddThread] = useState(false);

  // increases firestore count

  async function getThreads() {
    const board = await firebase.firestore().collection("board").get();
    const mappedBoard = board.docs.map((doc) => doc.data());
    // console.log(mappedBoard);
    return mappedBoard;
  }

  // fetches the threads from firestore and saves them to treadPosts state
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
  // TODO check out why posts get replicated after adding new thread
  return (
    <div className="App">
      <Header chan="Beschan" desc="A safe space for your catboy fantasies" />
      {!addThread ? (
        <button onClick={() => setAddThread(!addThread)}>Add a thread!</button>
      ) : (
        <div>
          <PostForm thread={true} />
          <button onClick={() => setAddThread(!addThread)}>Close</button>
        </div>
      )}
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
      {!addThread ? (
        <button onClick={() => setAddThread(!addThread)}>Add a thread!</button>
      ) : (
        <div>
          <PostForm thread={true} />
          <button onClick={() => setAddThread(!addThread)}>Close</button>
        </div>
      )}
    </div>
  );
}
export default App;
