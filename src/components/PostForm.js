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
  const [fileUrl, setFileUrl] = useState(null);

  async function addNewThread(name, text, title, imageName) {
    const db = firebase.firestore();
    const board = db.collection("board");
    // since getCurPosNo returns a promise, we need first to wait before we add it to the board (async required to use await here)
    const postNo = await props.getNo();

    board
      .add({
        user: name,
        text: text,
        title: title,
        // user: "Anyonymous",
        postNo: postNo,
        created: firebase.firestore.FieldValue.serverTimestamp(),
        image: imageName,
      })
      .then(props.incrNo());
  }

  const onFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const onImageSubmit = async () => {
    if (image != null) {
      const file = image;
      const storageRef = firebase.storage().ref();
      const fileRef = storageRef.child(file.name);
      await fileRef.put(file);
      setFileUrl(await fileRef.getDownloadURL());
    } else setFileUrl("");
  };

  return (
    <div className="Form">
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await onImageSubmit();
          addNewThread(name, text, title, "dpa");
        }}
        className="addForm"
      >
        <input
          placeholder="name"
          value={name}
          type="text"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <input
          placeholder="title"
          value={title}
          type="text"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <textarea
          placeholder="comment"
          value={text}
          type="text"
          onChange={(e) => {
            setText(e.target.value);
          }}
        />

        <input type="file" onChange={onFileChange} />
        <button>Submit</button>
      </form>
    </div>
  );
}

export default PostForm;
