import React, { useState, useEffect } from "react";
import "./App.css";
import { firebase } from "@firebase/app";
import { Switch, Route } from "react-router-dom";

import Threads from "./components/Threads";
import Header from "./components/Header";
import ShowPostForm from "./components/ShowPostForm";
import SingleThread from "./components/pages/SingleThread";

// TODO: Adress the font issue since it's pretty bad atm

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
          data.id = item.id;
          return data;
        });
        // setThreadToDisplay([firebaseThreads[0]]);
        setThreadPosts(firebaseThreads);
      });
  }, []);

  return (
    <div className="App">
      <Header chan="Beschan" desc="A safe space for your catboy fantasies" />
      <Switch>
        <Route exact path="/">
          <ShowPostForm thread={true} />
          <main>
            <Threads threadArray={threadPosts} />
          </main>
        </Route>
        <Route path="thread/:threadID">
          <SingleThread />
        </Route>
      </Switch>
    </div>
  );
}
export default App;
