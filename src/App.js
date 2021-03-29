import React, { useState, useEffect } from "react";
import "./App.css";
import Thread from "./components/Thread";
import Header from "./components/Header";

function App() {
  const [postNumeration, setPostNumeration] = useState(1);
  const [threadPosts, setThreadPosts] = useState([
    {
      postNo: postNumeration,
      title: "First post",
      time: new Date(),
      text: "Hello World",
      posts: {},
    },
  ]);

  let dupa = {
    postNo: postNumeration,
    title: "First post",
    time: new Date(),
    text: "Hello World",
  };

  function addNewThread(thread) {
    let emptyThread = [...threadPosts];
    emptyThread.push(thread);
    setThreadPosts(emptyThread);
  }

  function updatePostNumber() {
    setPostNumeration(postNumeration + 1);
  }
  useEffect(() => {
    updatePostNumber();
  }, [threadPosts]);

  return (
    <div className="App">
      <Header />
      <div className="Threads">
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
      </div>
      <button onClick={() => addNewThread(dupa)}>Add dupa</button>
    </div>
  );
}
export default App;
