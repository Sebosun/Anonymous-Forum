import React, { useState, useEffect } from "react";
import "./PostForm.css";

function PostForm(props) {
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  return (
    <div className="Form">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          props.addNewThread(name, text, title);
        }}
        className="addForm"
      >
        <input
          placeholder="Name"
          value={name}
          type="text"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <input
          placeholder="Title"
          value={title}
          type="text"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <input
          placeholder="Comment"
          value={text}
          type="text"
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
        <button>Submit</button>
      </form>
    </div>
  );
}

export default PostForm;
