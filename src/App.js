import React, { useState, useEffect } from "react";
import "./App.css";
import { firebase } from "@firebase/app";

import Thread from "./components/Thread";
import Header from "./components/Header";
import ShowPostForm from "./components/ShowPostForm";

function App() {
  const [threadPosts, setThreadPosts] = useState([]);

  // increases firestore postCount

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

  return (
    <div className="App">
      <Header chan="Beschan" desc="A safe space for your catboy fantasies" />
      <ShowPostForm thread={true} />

      <div className="Threads">
        {threadPosts.map((thread, index) => {
          return (
            <Thread
              key={index}
              id={thread.id}
              postNo={thread.postNo}
              title={thread.title}
              time={thread.created}
              text={thread.text}
              image={thread.image}
              user={thread.user}
            />
          );
        })}
      </div>
    </div>
  );
}
export default App;
