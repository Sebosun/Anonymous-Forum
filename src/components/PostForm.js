import React, { useState, useEffect } from "react";

function PostForm(props) {
  const [name, setName] = useState("Anonymous");
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  return (
    <div>
      <form class="addForm">
        <label>
          Name
          <input
            placeholder=""
            value={name}
            type="text"
            onChange={(e) => {
              console.log(e.target.value);
              setName(e.target.value);
            }}
          />
        </label>
        Title
        <label>
          <input
            placeholder=""
            value={title}
            type="text"
            onChange={(e) => {
              console.log(e);
              setTitle(e.target.value);
            }}
          />
        </label>
        <label>
          Text
          <input
            placeholder=""
            value={text}
            type="text"
            onChange={(e) => {
              setText(e.target.value);
            }}
          />
        </label>
      </form>
    </div>
  );
}

export default PostForm;
