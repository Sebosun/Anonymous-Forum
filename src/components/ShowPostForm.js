import { useState } from "react";
import PostForm from "./PostForm";
import Roller from "./UI/Roller";
import Button from "./UI/Button";

// Receives an optional props.id, if thread is true, forwards the post form with na id to
// the PostForm.
// If it has post.id and thread is set to true, PostForm knows it's a reply.
// It takes post.id and uses it to add a reply to a particular thread
function ShowPostForm(props) {
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function openCloseForm() {
    setShowForm((prevState) => !prevState);
  }

  const onSubmit = () => {
    setIsLoading((prev) => !prev);
  };

  if (isLoading) {
    return (
      <div className="loaderContainer">
        <Roller />
      </div>
    );
  } else {
    return (
      <div>
        {showForm ? (
          <div>
            <PostForm
              openCloseForm={openCloseForm}
              id={props.id}
              thread={props.thread}
              onSubmit={onSubmit}
            />
            <Button onClick={openCloseForm}>Close</Button>
          </div>
        ) : (
          <div className="showButton">
            <Button onClick={openCloseForm}>
              {`Add a ${props.thread ? "Thread!" : "comment!"}`}
            </Button>
          </div>
        )}
      </div>
    );
  }
}

export default ShowPostForm;
