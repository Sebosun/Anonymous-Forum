import React, { useState, useEffect } from "react";
import "./App.css";
import { firebase } from "@firebase/app";

import Threads from "./components/Threads";
import Header from "./components/Header";
import ShowPostForm from "./components/ShowPostForm";

// TODO: Adress the font issue since it's pretty bad atm

function App() {
  const [threadPosts, setThreadPosts] = useState([]);
  const [threadToDisplay, setThreadToDisplay] = useState([]);
  const [showSingleThread, setShowSingleThread] = useState(false);

  // gets Threas from firestore on first load
  useEffect(() => {
    firebase
      .firestore()
      .collection("board")
      .orderBy("created", "desc")
      .onSnapshot((serverUpdate) => {
        const firebaseThreads = serverUpdate.docs.map((item) => {
          let data = item.data();
          data.id = item.id;
          return data;
        });
        console.log(firebaseThreads);
        // setThreadToDisplay([firebaseThreads[0]]);
        setThreadPosts(firebaseThreads);
      });
  }, []);

  function handleSingleThread(thread) {
    // console.log(thread);
    setThreadToDisplay(thread);
    setShowSingleThread((prev) => !prev);
  }

  if (showSingleThread) {
    return (
      <div>
        <Header chan="Beschan" desc="Your Naruto Fanfics are safe here" />
        <Threads threadArray={threadToDisplay} />
      </div>
    );
  }
  return (
    <div className="App">
      <Header chan="Beschan" desc="A safe space for your catboy fantasies" />
      <ShowPostForm thread={true} />
      <Threads
        handleSingleThread={handleSingleThread}
        threadArray={threadPosts}
      />
    </div>
  );
}
export default App;
