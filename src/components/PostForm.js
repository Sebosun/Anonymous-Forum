import React, { useState, useEffect } from "react";

function Form(props) {
  const [name, setName] = useState("Anonymous");
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  return (
    <div>
      <form class="addForm">
        <label>
          Name
          <input placeholder="" value={name} type="text" onChange={} />
        </label>
        Title
        <label>
          <input placeholder="" value={text} type="text" onChange={} />
        </label>
        <label>
          text
          <input placeholder="" value={title} type="text" onChange={} />
        </label>
      </form>
    </div>
  );
}
