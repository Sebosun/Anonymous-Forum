import React, { useState, useEffect } from "react";
import "./PostForm.css";
import { firebase } from "@firebase/app";

function PostForm(props) {
  // TODO text verification, atm you can post infinite amount of text and it looks shit, not to mention spammy
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);

  const onFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const onImageSubmit = async () => {
    const file = image;
    const storageRef = firebase.storage().ref();
    const fileRef = storageRef.child(file.name);
    await fileRef.put(file);
    setFileUrl(await fileRef.getDownloadURL());
  };

  return (
    <div className="Form">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onImageSubmit().then(console.log(fileUrl));
          console.log(image);
          // props.addNew(name, text, title, image);
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
