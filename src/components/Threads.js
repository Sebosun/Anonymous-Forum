import Thread from "./Thread";

const Threads = (props) => {
  // function dupa (items) {
  //    props.onClick({
  //      key: thread.id,
  //      id: thread.id,
  //      postNo: thread.postNo,
  //      title: thread.title,
  //      time: thread.created,
  //      text: thread.text,
  //      image: thread.image,
  //      user: thread.user
  //    })
  // }
  return (
    <div className="Threads">
      {props.threadArray.map((thread) => {
        return (
          <Thread
            key={thread.id}
            id={thread.id}
            postNo={thread.postNo}
            title={thread.title}
            time={thread.created}
            text={thread.text}
            image={thread.image}
            user={thread.user}
            handleSingleThread={props.handleSingleThread}
          />
        );
      })}
    </div>
  );
};

export default Threads;
