import styles from "./ExpandThread.module.css";

const ExpandThread = (props) => {
  if (props.postNo === 0) {
    return null;
  } else {
    return (
      <div className={styles.expandThread}>
        <div>Icon :^)</div>
        <div>{props.postNo} posts omitted.</div>
        <div className={styles.expand}>Click to expand.</div>
      </div>
    );
  }
};

export default ExpandThread;
