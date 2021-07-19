import React, { useState, useEffect } from "react";
import "./App.css";
import { firebase } from "@firebase/app";

import Thread from "./components/Thread";
import Header from "./components/Header";
import ShowPostForm from "./components/ShowPostForm";

// Adress the font issue since it's pretty bad atm

function App() {
  const [threadPosts, setThreadPosts] = useState([]);

  // const handleNewThread = () => {
  //   firebase
  //     .firestore()
  //     .collection("board")
  //     .orderBy("created", "desc")
  //     .onSnapshot((serverUpdate) => {
  //       const firebaseThreads = serverUpdate.docs.map((item) => {
  //         let data = item.data();

  //         // console.log(data.id);
  //         data.id = item.id;
  //         // console.log(data.id);
  //         return data;
  //       });

  //       console.log("NEW THREAD B ITCHES");
  //       setThreadPosts([...firebaseThreads]);
  //     });
  // };

  // gets Threas from firestore on first load
  useEffect(() => {
    firebase
      .firestore()
      .collection("board")
      .orderBy("created", "desc")
      .onSnapshot((serverUpdate) => {
        const firebaseThreads = serverUpdate.docs.map((item) => {
          let data = item.data();

          // console.log(data.id);
          data.id = item.id;
          // console.log(data.id);
          return data;
        });

        setThreadPosts(firebaseThreads);
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
              key={thread.id}
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
