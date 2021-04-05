import React, { useState, useEffect } from "react";
import "./App.css";
import Thread from "./components/Thread";
import Header from "./components/Header";
import { firebase } from "@firebase/app";

function App() {
  const [threadPosts, setThreadPosts] = useState([]);

  // increases firestore count
  function incrPostNo() {
    const db = firebase.firestore();
    const increment = firebase.firestore.FieldValue.increment(1);
    const postNoRef = db.collection("meta").doc("data");
    postNoRef.update({ postNo: increment });
  }

  // test for getting stuff from thread posts, will setup collections within threads themselves
  // function getCurPostNo(){
  //     const db = firebase.firestore();
  //     db.collection("test").onSnapshot((serverUpdate) => {
  //         const mainPosts = serverUpdate.docs.map((_doc) =>{
  //             const data = _doc.data();
  //             console.log(data);
  //         }
  //         )
  //     })
  // }

  //gets the postNo from the meta collection
  function getCurPostNo() {
    const db = firebase.firestore();
    const data = db.collection("meta").doc("data");
    const postNo = data.get().then((doc) => {
      if (doc.exists) {
        return doc.data().postNo;
      } else {
        return 0;
      }
    });

    return postNo;
  }

  async function addNewThread(thread) {
    const db = firebase.firestore();
    const board = db.collection("board");
    // since getCurPosNo returns a promise, we need first to wait before we add it to the board (async required to use await here)
    const postNo = await getCurPostNo();

    board
      .add({
        name: thread.name,
        text: thread.text,
        title: thread.title,
        user: "Anyonymous",
        postNo: postNo,
        created: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(incrPostNo());
  }

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
          // console.log(_doc.data());
          let data = _doc.data();
          data.id = _doc.id;
          return data;
        });
        setThreadPosts(firebaseThreads);
        console.log("Threads", threadPosts);
      });
  }, []);

  return (
    <div className="App">
      <Header />
      <div className="Threads">
        {threadPosts.map((thread, index) => {
          return (
            <Thread
              key={index}
              id={thread.id}
              postNo={thread.postNo}
              title={thread.title}
              time={thread.created.toDate().toString()}
              text={thread.text}
            />
          );
        })}
      </div>
      <button
        onClick={() => {
          getCurPostNo().then((resolve) => console.log(resolve));
        }}
      >
        Print post no
      </button>
      <button onClick={() => incrPostNo()}>Firestore add!</button>
      <button
        onClick={() =>
          addNewThread({
            name: "First",
            text: "Hello world",
            title: "Title!",
          })
        }
      >
        Add thread to firse
      </button>
    </div>
  );
}
export default App;
