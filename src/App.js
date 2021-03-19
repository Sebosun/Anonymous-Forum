import React, { useState, useEffect } from "react";
import "./App.css";
import Thread from "./components/Thread";

function App() {
  const [threadPosts, setThreadPosts] = useState([
    {
      postNo: 1,
      title: "First post",
      time: new Date(),
      text: "Hello World",
    },
  ]);

  let dupa = {
    postNo: 1,
    title: "First post",
    time: new Date(),
    text: "Hello World",
  };

  function addNewThread(thread) {
    let emptyThread = [...threadPosts];
    emptyThread.push(thread);
    setThreadPosts(emptyThread);
  }

  return (
    <div className="App">
      {threadPosts.map((thread, index) => {
        return (
          <Thread
            index={index}
            postNo={thread.postNo}
            title={thread.title}
            time={thread.time.toString()}
            text={thread.text}
          />
        );
      })}
      <button onClick={() => addNewThread(dupa)}>Add dupa</button>
    </div>
  );
}
export default App;
