import styles from "./HideElement.module.css";
import { IoMdCloseCircleOutline } from "react-icons/io";

const HideElement = (props) => {
  return (
    <div onClick={props.onClick} className={styles.hideContainer}>
      <IoMdCloseCircleOutline />
      <div className={styles.text}>{props.text}</div>
    </div>
  );
};

export default HideElement;
