import styles from "./ExpandThread.module.css";

const ExpandThread = (props) => {
  return (
    <div className={styles.expandThread}>
      <div>Icon :^)</div>
      <div>{props.postNo - 3} posts omitted.</div>
      <div onClick={props.onClick} className={styles.expand}>
        Click to expand.
      </div>
    </div>
  );
};

export default ExpandThread;
