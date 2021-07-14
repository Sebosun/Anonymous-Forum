import PostForm from "./PostForm";

function ShowPostForm(props) {
  return (
    <div>
      {props.showForm ? (
        <div>
          <PostForm openCloseForm={props.openCloseForm} thread={true} />
          <button onClick={props.openCloseForm}>Close</button>
        </div>
      ) : (
        <div className="showButton">
          <button className="showButton" onClick={props.openCloseForm}>
            Add a thread!
          </button>
        </div>
      )}
    </div>
  );
}

export default ShowPostForm;
