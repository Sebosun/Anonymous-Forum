import React, { useState, useEffect } from "react";
import "./PostForm.css";
import { firebase } from "@firebase/app";

function PostForm(props) {
  // TODO text verification, atm you can post infinite amount of text and it looks shit, not to mention spammy
  // TODO Captcha verification i guess

  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);

  // increases the post number in meta collection
  async function incrPostNo() {
    const db = firebase.firestore();
    const increment = firebase.firestore.FieldValue.increment(1);
    const postNoRef = db.collection("meta").doc("data");
    postNoRef.update({ postNo: increment });
  }

  //gets the postNo from the meta collection
  function getNo() {
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

  function resetToDefault() {
    setName("");
    setText("");
    setTitle("");
    setImage(null);
  }
  // adds new thread to the firebase
  // based on if its a thread reply or a new tread altogether
  // if new thread, else post reply
  async function addNewThread(name, text, title, imageName) {
    const db = firebase.firestore();
    const postNo = await getNo();
    // by default assume its a thread, but if props.thread is false then it's a post
    let collection = db.collection("board");
    if (props.thread === false) {
      collection = db.collection("board").doc(props.id).collection("posts");
    }

    collection
      .add({
        user: name,
        text: text,
        title: title,
        postNo: postNo,
        created: firebase.firestore.FieldValue.serverTimestamp(),
        image: imageName,
      })
      .then(() => {
        incrPostNo().then(() => {
          props.onSubmit();
          props.openCloseForm();
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // adds the image to the state
  const onFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const onNameChange = (e) => {
    setName(e.target.value);
  };

  const onPostSubmit = async (e) => {
    e.preventDefault();
    // props.openCloseForm();
    props.onSubmit();
    if (image === null) {
      addNewThread(name, text, title, "");
      resetToDefault();
    } else {
      const file = image;
      const storageRef = firebase.storage().ref();
      const fileRef = storageRef.child(file.name);
      await fileRef.put(file);
      fileRef.getDownloadURL().then((url) => {
        addNewThread(name, text, title, url);
        resetToDefault();
      });
    }
  };

  return (
    <div className="Form">
      <form
        onSubmit={(e) => {
          onPostSubmit(e);
        }}
        className="addForm"
      >
        <input
          placeholder="name"
          value={name}
          type="text"
          onChange={onNameChange}
          className="postName"
          maxLength="25"
        />
        <input
          placeholder="title"
          value={title}
          type="text"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          className="postTitle"
          maxLength="30"
        />
        <textarea
          placeholder="comment"
          value={text}
          type="text"
          onChange={(e) => {
            setText(e.target.value);
          }}
          required
          className="postText"
          maxLength="1000"
        />

        {/* TODO validation of the files, making sure they're images */}

        {props.thread ? (
          <input
            className="postFile"
            type="file"
            onChange={onFileChange}
            required
          />
        ) : (
          <input className="postFile" type="file" onChange={onFileChange} />
        )}
        <button className="postSubmit">Submit</button>
      </form>
    </div>
  );
}

export default PostForm;
