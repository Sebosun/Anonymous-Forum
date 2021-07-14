import { useState } from "react";
import PostForm from "./PostForm";

// Receives an optional props.id, if thread is true, forwards the post form with na id to
// the PostForm.
// If it has post.id and thread is set to true, PostForm knows it's a reply.
// It takes post.id and uses it to add a reply to a particular thread
function ShowPostForm(props) {
  const [showForm, setShowForm] = useState(false);

  function openCloseForm() {
    setShowForm((prevState) => !prevState);
  }

  return (
    <div>
      {showForm ? (
        <div>
          <PostForm
            openCloseForm={openCloseForm}
            id={props.id}
            thread={props.thread}
          />
          <button onClick={openCloseForm}>Close</button>
        </div>
      ) : (
        <div className="showButton">
          <button className="showButton" onClick={openCloseForm}>
            {`Add a ${props.thread ? "Thread!" : "Post!"}`}
          </button>
        </div>
      )}
    </div>
  );
}

export default ShowPostForm;
