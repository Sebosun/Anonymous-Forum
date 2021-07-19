import React, { useState, useEffect } from "react";
import "./App.css";
import { firebase } from "@firebase/app";

import Threads from "./components/Threads";
import Header from "./components/Header";
import ShowPostForm from "./components/ShowPostForm";

// Adress the font issue since it's pretty bad atm

function App() {
  const [threadPosts, setThreadPosts] = useState([]);

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
        console.log(firebaseThreads);
        setThreadPosts(firebaseThreads);
      });
  }, []);

  return (
    <div className="App">
      <Header chan="Beschan" desc="A safe space for your catboy fantasies" />
      <ShowPostForm thread={true} />
      <Threads threadArray={threadPosts} />
    </div>
  );
}
export default App;
