import styles from "./HideElement.module.css";

const HideElement = (props) => {
  return (
    <div className={styles.hideContainer}>
      <button onClick={props.onClick} className={styles.square}></button>
      <div className={styles.text}>{props.text}</div>
    </div>
  );
};

export default HideElement;
