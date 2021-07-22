import styles from "./ExpandThread.module.css";
import { BsArrowsExpand, BsBoxArrowInDown } from "react-icons/bs";

const ExpandThread = (props) => {
  return (
    <div className={styles.expandThread}>
      <BsBoxArrowInDown size="1.5em" />
      <div>{props.postNo - 3} posts omitted.</div>
      <div onClick={props.onClick} className={styles.expand}>
        Click to expand.
      </div>
    </div>
  );
};

export default ExpandThread;
