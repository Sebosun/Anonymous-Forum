import styles from "./HideElement.module.css";

const HideElement = (props) => {
  return (
    <div onClick={props.onClick} className={styles.hideContainer}>
      <button className={styles.square}></button>
      <div className={styles.text}>{props.text}</div>
    </div>
  );
};

export default HideElement;
